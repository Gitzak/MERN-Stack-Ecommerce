const fs = require('fs');
const path = require('path');

const projectRoot = '../server'; // Change this to your desired project root folder name

function createDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(`Created directory: ${dirPath}`);
    }
}

function createFile(filePath, content = '') {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        console.log(`Created file: ${filePath}`);
    }
}

function createFolderStructure() {
    createDirectory(projectRoot);

    const controllersPath = path.join(projectRoot, 'controllers');
    createDirectory(controllersPath);

    const servicesPath = path.join(projectRoot, 'services');
    createDirectory(servicesPath);

    const repositoriesPath = path.join(projectRoot, 'repositories');
    createDirectory(repositoriesPath);

    const modelsPath = path.join(projectRoot, 'models');
    createDirectory(modelsPath);

    const routesPath = path.join(projectRoot, 'routes');
    createDirectory(routesPath);

    const apiPath = path.join(routesPath, 'api');
    createDirectory(apiPath);

    const middlewarePath = path.join(projectRoot, 'middleware');
    createDirectory(middlewarePath);

    const constantsPath = path.join(projectRoot, 'constants');
    createDirectory(constantsPath);

    const utilsPath = path.join(projectRoot, 'utils');
    createDirectory(utilsPath);

    // Create the additional files
    createFile(path.join(projectRoot, 'app.js'));
    createFile(path.join(projectRoot, 'server.js'));
    createFile(path.join(projectRoot, '.env'));
    createFile(path.join(projectRoot, '.gitignore'), '/node_modules\n*.log\n.DS_Store\n.env');
    createFile(path.join(projectRoot, 'README.md'), '# My Project\n\nProject description here.');

    console.log('Folder structure and files created successfully.');
}

createFolderStructure();
