
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5502;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Validation function
function validateProjectData({ projectName, projectStatus, dateCreated, dueDate, projectPriority }) {
    return projectName && projectStatus && dateCreated && dueDate && projectPriority;
}

app.post('/createProject', (req, res) => {
    const { projectName, projectStatus, dateCreated, dueDate, projectPriority } = req.body;

    // Use the validation function
    if (!validateProjectData(req.body)) {
        return res.status(400).send('All fields are required and cannot be empty.');
    }

    const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
</head>
<body>
    <h1>Project: ${projectName}</h1>
    <p>Status: ${projectStatus}</p>
    <p>Date Created: ${dateCreated}</p>
    <p>Due Date: ${dueDate}</p>
    <p>Priority: ${projectPriority}</p>
</body>
</html>
    `;

    const fileName = `${projectName.replace(/\s+/g, '_')}.html`;
    fs.writeFile(`./project-files/${fileName}`, template, (err) => {
        if (err) {
            console.error(err);
            return res.send('Error creating project file.');
        }
        res.send(`Project file ${fileName} created successfully.`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});