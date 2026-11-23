# PŪLA Grooming — Firestore Security Specification (Phase 0 TDD)

## 1. Data Invariants
1. **Strict Ownership & PII Isolation**: `/users/{userId}`, `/orders/{orderId}`, and `/barberInquiries/{inquiryId}` contain personal delivery suburbs, phone numbers, and names. Reads and list queries are strictly restricted to the owning `request.auth.uid` or a verified Apothecary Admin (`KatlehoMarite@gmail.com` with `email_verified == true` or existence in `/admins/{uid}`).
2. **Master Gate on Subcollections**: `/users/{userId}/ritualLogs/{logId}` cannot be created, read, or deleted unless the parent `/users/{userId}` document exists. List queries verify `resource.data.userId == userId` without costly `get()`/`exists()` calls.
3. **Order Integrity & Status Locking**: New orders MUST start in `status == 'pending'`, MUST contain at least 1 item (`qtySingle + qtyTwin + qtyKit >= 1`), MUST satisfy `total == subtotal + deliveryFee`, and MUST stamp `createdAt == request.time` and `updatedAt == request.time`. Customers may only transition their own `pending` order to `cancelled`; terminal states (`delivered`, `cancelled`) are locked against non-admin mutations.
4. **Shadow Field Rejection**: Every `create` validates both `hasAll([...])` and `hasOnly([...])`; every `update` validates `isValid[Entity](incoming())` AND `affectedKeys().hasOnly([...])`.
5. **Temporal Integrity**: All `createdAt` and `updatedAt` timestamps MUST equal `request.time`. `createdAt`, `userId`, and `orderNumber` are immutable after creation.
6. **Verified Identity**: All authenticated write operations require `request.auth.token.email_verified == true`.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Identity Spoofing on Order**: Authenticated user A attempts to create `/orders/ord1` with `userId: "user_B"`. -> `PERMISSION_DENIED`.
2. **Shadow Field Injection on Profile**: User A creates `/users/user_A` with extra ghost field `isAdmin: true`. -> `PERMISSION_DENIED`.
3. **State Shortcutting on Order**: User A creates `/orders/ord2` with `status: "delivered"`. -> `PERMISSION_DENIED`.
4. **Price Tampering on Order**: User A creates `/orders/ord3` with `subtotal: 220, deliveryFee: 30, total: 10`. -> `PERMISSION_DENIED`.
5. **Client Timestamp Forgery**: User A creates `/reviews/rev1` with client-supplied `createdAt` instead of `request.time`. -> `PERMISSION_DENIED`.
6. **PII Blanket Read**: Authenticated user B attempts `get` on `/users/user_A` or `/orders/ord_owned_by_A`. -> `PERMISSION_DENIED`.
7. **Unverified Admin Email Spoof**: User with `email: "KatlehoMarite@gmail.com"` and `email_verified: false` attempts to update `/editions/single`. -> `PERMISSION_DENIED`.
8. **ID Poisoning / Resource Exhaustion**: Attacker writes to `/reviews/../../evil` or 200-char ID or 5KB comment string. -> `PERMISSION_DENIED`.
9. **Terminal State Re-Opening**: Customer attempts to update a `delivered` order back to `pending`. -> `PERMISSION_DENIED`.
10. **Immutable Field Mutation**: Customer updates `createdAt` or `orderNumber` on an existing order. -> `PERMISSION_DENIED`.
11. **Orphaned Ritual Log Write**: User attempts to write `/users/user_A/ritualLogs/log1` before `/users/user_A` exists. -> `PERMISSION_DENIED`.
12. **Blanket Order List Scraping**: User B queries `/orders` without `where('userId', '==', uid)`. -> `PERMISSION_DENIED`.
