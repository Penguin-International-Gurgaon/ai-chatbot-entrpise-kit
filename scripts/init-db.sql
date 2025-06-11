-- Initialize AI Chatbot database
-- This script runs when the PostgreSQL container is first created

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Set timezone
SET timezone = 'UTC';

-- Create additional schemas if needed
-- CREATE SCHEMA IF NOT EXISTS analytics;
-- CREATE SCHEMA IF NOT EXISTS audit;

-- Grant necessary permissions
-- GRANT ALL PRIVILEGES ON DATABASE ai_chatbot_dev TO postgres;
-- GRANT ALL PRIVILEGES ON DATABASE ai_chatbot_prod TO postgres;

-- Insert initial configuration data if needed
-- This will be done by the application migrations instead