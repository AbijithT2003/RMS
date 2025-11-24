# Notification System - Quick Start Guide

## 🎯 One-Minute Setup

### Step 1: Import Hook

```jsx
import { useNotification } from "../../api/context/useNotificationHook";
```

### Step 2: Initialize

```jsx
const MyComponent = () => {
  const notification = useNotification();
  // Ready to use!
};
```

### Step 3: Use It

```jsx
// Success
notification.success("Profile updated!", "Success");

// Error
notification.error("Failed to save", "Error");

// Warning
notification.warning("This cannot be undone", "Warning");

// Info
notification.info("Here's some information", "Info");
```

## 📋 Copy-Paste Examples

### Example 1: Async Action with Try/Catch

```jsx
const handleSave = async () => {
  try {
    await api.save(data);
    notification.success("Saved successfully!", "Success");
  } catch (error) {
    notification.error(error.message || "Save failed", "Error");
  }
};
```

### Example 2: Validation

```jsx
const handleSubmit = (e) => {
  e.preventDefault();

  if (!email) {
    notification.warning("Please enter email", "Validation");
    return;
  }

  // ... rest of logic
};
```

### Example 3: Replace Old Alert

```jsx
// OLD
alert("Are you sure?");
if (window.confirm("Delete?")) {
  /* delete */
}

// NEW
notification.warning("Item will be permanently deleted", "Confirm");
// Then add a confirmation dialog if needed
```

## 🎨 Styling - Quick Override

Edit `src/components/NotificationDialog/NotificationDialog.css`:

### Change Success Color

```css
.notification-success {
  background-color: #YOUR_COLOR;
  border-left-color: #YOUR_COLOR;
}
```

### Change Position (default: top-right)

```css
.notification-container {
  top: 20px;
  right: 20px;
  /* Change to: left: 20px; for left side */
  /* Change to: bottom: 20px; for bottom */
}
```

### Change Duration (default: 5 seconds)

```jsx
notification.success("Message", "Title", 3000); // 3 seconds
notification.error("Message", "Title", 0); // Never auto-close
```

## ❌ Common Mistakes to Avoid

```jsx
// ❌ WRONG - Old import
import { useNotification } from "../../api/context/NotificationContext";

// ✅ CORRECT - New import
import { useNotification } from "../../api/context/useNotificationHook";
```

```jsx
// ❌ WRONG - Not initialized
const MyComponent = () => {
  notification.success("Hi"); // Error!
};

// ✅ CORRECT - Initialized first
const MyComponent = () => {
  const notification = useNotification();
  notification.success("Hi"); // Works!
};
```

```jsx
// ❌ WRONG - Still using alert
alert("This is old");

// ✅ CORRECT - Using notifications
notification.success("This is new!", "Message");
```

## 📊 Message Types At a Glance

| Type        | Color     | Use Case             | Example                    |
| ----------- | --------- | -------------------- | -------------------------- |
| **success** | 🟢 Green  | Operation succeeded  | "Profile updated!"         |
| **error**   | 🔴 Red    | Operation failed     | "Failed to save changes"   |
| **warning** | 🟡 Yellow | Caution/confirmation | "This action is permanent" |
| **info**    | 🔵 Blue   | Information only     | "Your profile incomplete"  |

## 🔍 File Locations

- **Hook to import**: `src/api/context/useNotificationHook.js`
- **Component**: `src/components/NotificationDialog/NotificationDialog.jsx`
- **Styles**: `src/components/NotificationDialog/NotificationDialog.css`
- **Provider**: `src/App.jsx` (already wrapped)

## 🚀 Now Go Update More Pages!

### Ready to Update:

- `src/pages/job-posting/EditJobPage.jsx`
- `src/pages/admin/UserManagementPage.jsx`
- `src/pages/jobs/JobDetailsPage.jsx`

Copy the pattern from already-updated pages and apply to these files.

---

**Need help?** Check `NOTIFICATION_SYSTEM_GUIDE.md` for detailed documentation.
