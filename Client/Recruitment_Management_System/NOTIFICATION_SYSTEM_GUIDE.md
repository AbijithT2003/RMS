# Dialog/Notification System Integration Guide

## Overview

A centralized notification system has been implemented to replace all `alert()` calls and console messages with elegant, non-intrusive dialog boxes that appear in the top-right corner of the screen.

## Features

- ✅ Success notifications (green)
- ✅ Error notifications (red)
- ✅ Warning notifications (yellow)
- ✅ Info notifications (blue)
- ✅ Auto-dismissal after configurable duration
- ✅ Manual close button
- ✅ Stacked notifications
- ✅ Smooth animations
- ✅ Responsive design for mobile

## Components Created

### 1. NotificationContext (`src/api/context/NotificationContext.jsx`)

**Purpose:** Manages notification state globally across the application

**Usage:**

```jsx
import { useNotification } from "../../api/context/NotificationContext";

const MyComponent = () => {
  const notification = useNotification();

  // Show different types of notifications
  notification.success("Operation successful!", "Success");
  notification.error("Something went wrong!", "Error");
  notification.warning("Please check this!", "Warning");
  notification.info("Here's some information", "Info");

  // Shorthand (auto-generates title based on type)
  notification.showNotification("Message", "success", 5000, "Custom Title");
};
```

### 2. NotificationDialog Component (`src/components/NotificationDialog/`)

- **NotificationDialog.jsx**: React component that renders stacked notifications
- **NotificationDialog.css**: Styling with animations and colors

## Setup (Already Done)

1. ✅ NotificationProvider wrapped in App.jsx
2. ✅ NotificationContext exported for use throughout the app
3. ✅ CSS styling with smooth animations

## How to Use in Your Pages

### Basic Usage Pattern

```jsx
import { useNotification } from "../../api/context/NotificationContext";

const MyPage = () => {
  const notification = useNotification();

  const handleAction = async () => {
    try {
      // Perform action
      await someAPI.call();
      notification.success("Action completed!", "Success");
    } catch (error) {
      notification.error(error.message, "Error");
    }
  };

  return <button onClick={handleAction}>Do Something</button>;
};
```

### Method Reference

All methods have signature: `method(message, title?, duration?)`

- Default duration: 5000ms (5 seconds)
- Set duration to 0 for persistent notifications (user must close)

```jsx
// Success (green)
notification.success("Profile updated!", "Success", 5000);

// Error (red)
notification.error("Failed to save changes", "Error", 5000);

// Warning (yellow/orange)
notification.warning("This action cannot be undone", "Warning", 5000);

// Info (blue)
notification.info("Your profile is incomplete", "Information", 5000);
```

## Pages Already Updated

1. ✅ JobListPage.jsx - All alerts replaced with notifications
2. ✅ AuthPage.jsx - Login/register errors show as notifications

## Pages to Update

Replace all `alert()` calls and `console.error()` calls in these files:

### High Priority (User-Facing Actions)

- `src/pages/profile/ApplicantProfilePage.jsx` - Profile updates
- `src/pages/applications/ManageApplicationsPage.jsx` - Application updates
- `src/pages/interviews/InterviewSchedulePage.jsx` - Interview scheduling
- `src/pages/jobs/SavedJobsPage.jsx` - Saved jobs management
- `src/pages/admin/UserManagementPage.jsx` - User management

### Medium Priority (Skill Management)

- `src/pages/skills/SkillsManagementPage.jsx` - Skill CRUD operations
- `src/pages/profile/EditProfilePage.jsx` - Profile editing
- `src/pages/job-posting/EditJobPage.jsx` - Job management

### Low Priority (Development Logging)

- `src/pages/admin/AdminDashboardPage.jsx` - console.log calls

## Replacement Examples

### Before (Using alert)

```jsx
const handleApply = async (job) => {
  try {
    await applicationsApi.applyToJob(request);
    alert("Application submitted successfully!");
  } catch (err) {
    console.error("Error applying to job:", err);
    alert("Failed to apply. Please try again.");
  }
};
```

### After (Using notification)

```jsx
const handleApply = async (job) => {
  const notification = useNotification();
  try {
    await applicationsApi.applyToJob(request);
    notification.success("Application submitted successfully!", "Success");
  } catch (err) {
    notification.error(
      "Failed to apply. Please try again.",
      "Application Error"
    );
  }
};
```

## Styling Customization

### Colors (in NotificationDialog.css)

- Success: `#28a745` (green)
- Error: `#dc3545` (red)
- Warning: `#ffc107` (yellow)
- Info: `#17a2b8` (blue)

To customize, edit `.notification-[type]` classes in NotificationDialog.css

### Position

Default: Top-right corner (`top: 20px; right: 20px`)
To change, modify `.notification-container` in NotificationDialog.css

### Duration

- Short messages: 3000ms (3 seconds)
- Medium messages: 5000ms (5 seconds)
- Long messages: 7000ms (7 seconds)
- Persistent: 0 (requires manual close)

## Best Practices

1. **Always include titles** - Helps users understand the type of message
2. **Use appropriate types** - Don't use error for warnings
3. **Keep messages concise** - Users should read in <5 seconds
4. **Remove console.error when adding notifications** - No need for both
5. **Use consistent terminology** - Similar actions should use similar messages

## Example: Converting a Page

```jsx
// Step 1: Add import
import { useNotification } from "../../api/context/NotificationContext";

// Step 2: Get notification hook in component
const MyPage = () => {
  const notification = useNotification();

  // Step 3: Replace alert() calls
  // Old: alert("Saved successfully!");
  // New: notification.success("Saved successfully!", "Success");

  // Step 4: Remove console.error or keep for debugging
};
```

## Testing

The notification system works immediately after setup. Test by:

1. Running the application
2. Triggering any error condition (e.g., invalid login)
3. Verifying notification appears in top-right corner
4. Checking it auto-dismisses after 5 seconds
5. Clicking close button (✕) to manually dismiss

## Support

For issues or questions about the notification system:

1. Check NotificationContext.jsx for hook usage
2. Verify useNotification() is called within a component
3. Ensure NotificationProvider wraps the component tree in App.jsx
