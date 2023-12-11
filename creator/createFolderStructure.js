const fs = require('fs');
const path = require('path');

const projectRoot = '../server'; // Change this to your desired project root folder name

function createDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        // console.log(`Created directory: ${dirPath}`);
    }
}

function createFile(filePath, content = '') {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        // console.log(`Created file: ${filePath}`);
    }
}

function createFolderStructure() {
    createDirectory(projectRoot);

    const controllersPath = path.join(projectRoot, 'controllers');
    createDirectory(controllersPath);
    createFile(path.join(controllersPath, 'userController.js'));

    const servicesPath = path.join(projectRoot, 'services');
    createDirectory(servicesPath);
    createFile(path.join(servicesPath, 'userService.js'));

    const repositoriesPath = path.join(projectRoot, 'repositories');
    createDirectory(repositoriesPath);
    createFile(path.join(repositoriesPath, 'userRepository.js'));

    const modelsPath = path.join(projectRoot, 'models');
    createDirectory(modelsPath);
    createFile(path.join(modelsPath, 'User.js'));

    const routesPath = path.join(projectRoot, 'routes');
    createDirectory(routesPath);
    createFile(path.join(routesPath, 'index.js'));
    const apiPath = path.join(routesPath, 'api');
    createDirectory(apiPath);
    createFile(path.join(apiPath, 'userRoutes.js'));

    const middlewarePath = path.join(projectRoot, 'middleware');
    createDirectory(middlewarePath);
    createFile(path.join(middlewarePath, 'authMiddleware.js'));

    const constantsPath = path.join(projectRoot, 'constants');
    createDirectory(constantsPath);
    createFile(path.join(constantsPath, 'index.js'));

    const configPath = path.join(projectRoot, 'config');
    createDirectory(configPath);
    createFile(path.join(configPath, 'keys.js'));

    const utilsPath = path.join(projectRoot, 'utils');
    createDirectory(utilsPath);
    createFile(path.join(utilsPath, 'db.js'));

    // Create the additional files
    createFile(path.join(projectRoot, 'app.js'));
    createFile(path.join(projectRoot, 'server.js'));
    createFile(path.join(projectRoot, '.env'));
    createFile(path.join(projectRoot, '.gitignore'), '/node_modules\n*.log\n.DS_Store\n.env');
    createFile(path.join(projectRoot, 'README.md'), '# My Project\n\nProject description here.');

    // console.log('Folder structure and files created successfully.');
}

createFolderStructure();
