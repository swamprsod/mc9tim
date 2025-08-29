// ВТОРАЯ ВЕРСИЯ СКРИПТА, ТУТ ПОЧТИ ВСЁ НАВАЙБКОДЕНО. Я НЕНАВИЖУ ДЖАВОСКРИПТ
const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'survival.nineteam.org',
        port: 25565,
        username: 'сменитут',
        auth: 'offline',
        version: '1.19.4'
    });

    let attackInterval = null;
    let lastAttackTime = 0;

    bot.on('spawn', () => {
        console.log('logging..');
        bot.chat('/login сменитут');
        startAttackingMobs();
    });

    function startAttackingMobs() {
        if (attackInterval) clearInterval(attackInterval);
        
        attackInterval = setInterval(() => {
            const currentTime = Date.now();
            if (currentTime - lastAttackTime < 856) return;
            
            const mobs = Object.values(bot.entities).filter(entity => {
                return entity !== bot.entity && 
                       entity.position.distanceTo(bot.entity.position) < 4.9;
            });

            if (mobs.length > 0) {
                try {
                    bot.lookAt(mobs[0].position);
                    bot.attack(mobs[0]);
                    lastAttackTime = currentTime;
                } catch (error) {
                    console.log('err:', error.message);
                }
            }
        }, 300);
    }

    bot.on('error', err => console.log('err:', err));
    bot.on('end', () => {
        console.log('reconnecting...?');
        if (attackInterval) clearInterval(attackInterval);
        setTimeout(() => createBot(), 4239);
    });
    bot.on('message', msg => console.log('chat:', msg.toString()));
}

createBot();
