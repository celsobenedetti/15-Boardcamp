-- 1
SELECT users.id, users.name, cities.name as city
FROM users JOIN cities 
ON users."cityId" = cities.id
WHERE cities.name = 'Rio de Janeiro'
ORDER BY users.id;

-- 2
SELECT t.id, u1.name AS writer, u2.name AS recipient, t.message
FROM testimonials AS t JOIN users AS u1 ON u1.id = t."writerId"
JOIN users AS u2 ON u2.id = t."recipientId"
ORDER BY t.id;

--3
SELECT c.id, u.name, c.name AS course, s.name AS school, e."endDate"
FROM courses AS c 
JOIN educations as e ON e."courseId" = c.id
JOIN schools AS s ON s.id = e."schoolId"
JOIN users AS u on u.id = e."userId"
WHERE u.id = 30 AND e.status = 'finished'
ORDER BY c.id;

-- 4
SELECT u.id, u.name, r.name AS role, c.name AS company, e."startDate"
FROM companies AS c
JOIN experiences AS e ON e."companyId" = c.id
JOIN roles as r ON r.id = e."roleId"
JOIN users as u ON u.id = e."userId"
WHERE u.id = 50 AND e."endDate" IS NULL
ORDER BY u.id;

-- Bonus
SELECT s.id, s.name AS school, courses.name AS course, c.name AS company, r.name AS roles
FROM schools AS s
JOIN educations AS e ON e."schoolId" = s.id
JOIN courses ON courses.id = e."courseId"
JOIN users as u ON u.id = e."userId"
JOIN applicants AS a ON a."userId" = u.id 
JOIN jobs AS j ON j.id = a."jobId"
JOIN roles AS r ON r.id = j."roleId"
JOIN companies AS c ON c.id = j."companyId"
WHERE j.active
AND r.name = 'Software Engineer'
AND c.id = 10
ORDER BY s.id;
