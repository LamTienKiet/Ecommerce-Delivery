-- Readers use row versions instead of waiting on writers; without this, concurrent checkouts deadlock.
ALTER DATABASE CURRENT SET READ_COMMITTED_SNAPSHOT ON WITH ROLLBACK IMMEDIATE;
