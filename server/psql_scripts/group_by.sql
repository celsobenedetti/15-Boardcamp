--1 
SELECT COUNT(id) AS "currentExperiences"
FROM experiences
WHERE "endDate" IS NOT NULL;

--2
SELECT u.id, COUNT(e.id) AS educations
FROM users u
JOIN educations e ON e."userId" = u.id
WHERE e."endDate" IS NOT NULL
GROUP BY u.id;

-- 3
SELECT u.name AS writer, COUNT(t.id) AS testimonialsCount
FROM users u 
JOIN testimonials t ON t."writerId" = u.id
WHERE u.id = 435
GROUP BY writer;

--4
SELECT MAX(j.salary) as "maximumSalary", r.name AS role
FROM jobs j
JOIN roles r ON j."roleId" = r.id
WHERE j.active
GROUP BY role
ORDER BY "maximumSalary";

--Bonus
SELECT s.name AS school, c.name AS course, COUNT(e.id) AS "studentCount"
FROM schools s
JOIN educations e ON e."schoolId" = s.id
JOIN courses c ON e."courseId" = c.id
JOIN users u ON e."userId" = u.id
WHERE e.status = 'ongoing' OR e.status = 'finished'
GROUP BY school, course
ORDER BY "studentCount" DESC;
