import chalk from 'chalk';
import figlet from 'figlet';
import { exec, spawn } from 'child_process';
import readline from 'readline';
import chokidar from 'chokidar';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startLoading = (message) => {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    return setInterval(() => {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(chalk.cyan(`${frames[i]} ${message}`));
        i = (i + 1) % frames.length;
    }, 100);
};

const stopLoading = (interval, message) => {
    clearInterval(interval);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    console.log(chalk.green(`✔ ${message}`));
};

let backendProcess;
let frontendProcess;
let currentErrors = [];

const clearPort = (port) => {
    return new Promise((resolve, reject) => {
        const command = process.platform === 'win32' 
            ? `netstat -ano | findstr :${port} | findstr LISTENING`
            : `lsof -i :${port} | grep LISTEN | awk '{print $2}'`;

        exec(command, (error, stdout) => {
            if (error && !stdout) {
                resolve(); // Skip if no process is found
                return;
            }

            // Extract PIDs for Windows and Unix-based systems
            const pids = stdout.split('\n').filter(line => line.trim() !== "").map(line => {
                return process.platform === 'win32' ? line.trim().split(/\s+/).pop() : line.trim();
            }).filter(pid => pid && !isNaN(pid)); // Ensure PID is a valid number

            if (pids.length === 0) {
                resolve(); // No valid PID found, skip further actions
                return;
            }

            const killCommand = process.platform === 'win32' ? 'taskkill /F /PID' : 'kill -9';

            // Terminate all processes using the extracted PIDs
            pids.forEach(pid => {
                exec(`${killCommand} ${pid}`, (err) => {
                    if (err) {
                        console.error(chalk.red(`Errore nel terminare il processo ${pid}:`, err));
                    } else {
                        console.log(chalk.green(`Processo ${pid} terminato sulla porta ${port}`));
                    }
                });
            });

            resolve();
        });
    });
};


const clearPorts = async () => {
    await clearPort(5000);
    await clearPort(3000);
};

const startBackend = () => {
    const npmPath = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    backendProcess = spawn(npmPath, ['run', 'start:backend'], { 
        stdio: 'pipe',
        shell: true
    });

    backendProcess.stdout.on('data', (data) => {
        if (process.argv[2] === 'pro') {
            console.log(chalk.blue('[Backend] ') + data.toString());
        }
    });

    backendProcess.stderr.on('data', (data) => {
        const errorMessage = data.toString();
        if (errorMessage.toLowerCase().includes('error')) {
            currentErrors.push({ type: 'Backend', message: errorMessage });
        }
        if (process.argv[2] === 'pro') {
            console.error(chalk.red('[Backend Error] ') + errorMessage);
        }
    });
};

const startFrontend = () => {
    const npmPath = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    frontendProcess = spawn(npmPath, ['run', 'start:frontend'], { 
        stdio: 'pipe',
        shell: true
    });

    frontendProcess.stdout.on('data', (data) => {
        if (process.argv[2] === 'pro') {
            console.log(chalk.magenta('[Frontend] ') + data.toString());
        }
        if (data.includes('http://192.168.0.120:3000')) {
            console.log(chalk.cyan(`🌐 Frontend: http://192.168.0.120:3000/`));
        }
    });

    frontendProcess.stderr.on('data', (data) => {
        const errorMessage = data.toString();
        
        // Ignora il messaggio di creazione del proxy
        if (errorMessage.includes('[HPM] Proxy created')) {
            console.log(chalk.yellow('[Frontend Info] ') + errorMessage.trim());
            return; // Non trattare come errore
        }
        
        if (errorMessage.toLowerCase().includes('error')) {
            currentErrors.push({ type: 'Frontend', message: errorMessage });
        }
    
        if (process.argv[2] === 'pro') {
            console.error(chalk.red('[Frontend Error] ') + errorMessage.trim());
        }
    });
    
};

const restartServices = async () => {
    if (backendProcess) {
        backendProcess.kill();
    }
    if (frontendProcess) {
        frontendProcess.kill();
    }
    await clearPorts();
    startBackend();
    startFrontend();
};

const startMinimal = async () => {
    console.clear();
    console.log(chalk.green(figlet.textSync('SlashSlot')));
    
    const loadingInterval = startLoading('Avvio dei servizi in corso...\n');

    await clearPorts();
    startBackend();
    startFrontend();

    setTimeout(() => {
        stopLoading(loadingInterval, 'Servizi avviati');
        
        if (currentErrors.length === 0) {
            console.log(chalk.green('✅ Non ci sono errori critici'));
        } else {
            console.log(chalk.red(`❌ Ci sono ${currentErrors.length} errori:`));
            currentErrors.forEach(error => {
                console.log(chalk.red(`   - [${error.type}] ${error.message.trim()}`));
            });
        }
    }, 5000);

    chokidar.watch([path.join(__dirname, 'backend'), path.join(__dirname, 'frontend')], {
        ignored: /(^|[\/\\])\../,
        persistent: true
    }).on('change', async (path) => {
        console.clear();
        console.log(chalk.green(figlet.textSync('SlashSlot')));
        console.log(chalk.yellow('File modificato. Riavvio in corso...'));
        
        currentErrors = [];
        await restartServices();
        
        setTimeout(() => {
            if (currentErrors.length === 0) {
                console.log(chalk.green('✅ Non ci sono errori critici'));
            } else {
                console.log(chalk.red(`❌ Ci sono ${currentErrors.length} errori:`));
                currentErrors.forEach(error => {
                    console.log(chalk.red(`   - [${error.type}] ${error.message.trim()}`));
                });
            }
        }, 5000);
    });
};

const startPro = async () => {
    console.clear();
    console.log(chalk.green(figlet.textSync('SlashSlot')));
    console.log(chalk.yellow('Avvio di SlashSlot in modalità PRO...\n'));

    const loadingInterval = startLoading('Avvio dei servizi in corso...');

    await clearPorts();
    startBackend();
    startFrontend();

    setTimeout(() => {
        stopLoading(loadingInterval, 'Servizi avviati');
    }, 5000);

    const printErrorStatus = () => {
        console.log(chalk.yellow('\n--- Stato degli errori ---'));
        if (currentErrors.length === 0) {
            console.log(chalk.green('✅ Non ci sono errori attualmente'));
        } else {
            console.log(chalk.red(`❌ Ci sono ${currentErrors.length} errori non risolti:`));
            currentErrors.forEach((error, index) => {
                console.log(chalk.red(`   ${index + 1}. [${error.type}] ${error.message.trim()}`));
            });
        }
        console.log(chalk.yellow('-------------------------\n'));
    };

    chokidar.watch([path.join(__dirname, 'backend'), path.join(__dirname, 'frontend')], {
        ignored: /(^|[\/\\])\../,
        persistent: true
    }).on('change', async (path) => {
        console.log(chalk.yellow(`\nFile modificato: ${path}`));
        console.log(chalk.yellow('Riavvio in corso...'));
        
        const oldErrorsCount = currentErrors.length;
        currentErrors = [];
        await restartServices();
        
        setTimeout(() => {
            const newErrorsCount = currentErrors.length;
            if (newErrorsCount < oldErrorsCount) {
                console.log(chalk.green(`✅ Risolti ${oldErrorsCount - newErrorsCount} errori`));
            } else if (newErrorsCount > oldErrorsCount) {
                console.log(chalk.red(`❌ Trovati ${newErrorsCount - oldErrorsCount} nuovi errori`));
            } else {
                console.log(chalk.yellow('Nessun cambiamento nel numero di errori'));
            }
            printErrorStatus();
        }, 5000);
    });
};

const args = process.argv.slice(2);
if (args[0] === 'pro') {
    startPro();
} else {
    startMinimal();
}
