-- SQL grammar cannot separate a keyword and a field with the same name as the keyword.
CREATE TABLE t {text TEXT}
INSERT INTO t(text)
