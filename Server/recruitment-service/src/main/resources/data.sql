-- ============================================
-- Initialize default roles
-- ============================================
INSERT INTO roles (id, name, code, description, created_at, updated_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Administrator', 'ADMIN', 'System administrator with full access', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440001', 'Recruiter', 'RECRUITER', 'HR recruiter who can manage jobs and interviews', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'Candidate', 'CANDIDATE', 'Job seeker who can apply for positions', NOW(), NOW())
ON CONFLICT (code) DO NOTHING;


-- ============================================
-- Sample users with roles
-- ============================================
INSERT INTO users (id, email, password_hash, full_name, phone, is_active, created_at, updated_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440030', 'admin@example.com', 'admin123', 'Admin User', '+1-555-0100', true, NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440031', 'recruiter@example.com', 'recruiter123', 'John Recruiter', '+1-555-0101', true, NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440032', 'candidate@example.com', 'candidate123', 'Jane Candidate', '+1-555-0102', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;


-- ============================================
-- User role assignments
-- ============================================
INSERT INTO user_roles (user_id, role_id)
VALUES
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440000'), -- Admin
  ('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440001'), -- Recruiter
  ('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440002')  -- Candidate
ON CONFLICT DO NOTHING;
