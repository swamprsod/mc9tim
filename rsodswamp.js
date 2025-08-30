// ВТОРАЯ ВЕРСИЯ СКРИПТА, ТУТ ПОЧТИ ВСЁ НАВАЙБКОДЕНО. Я НЕНАВИЖУ ДЖАВОСКРИПТ
const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'survival.nineteam.org',
    port: 25565,
    username: 'исправь',
    auth: 'offline',
    version: '1.19.4'
  });

  let attackInterval = null;
  let lastAttackTime = 0;
  let attackCooldown = 730;
  let loginAttempted = false;
  let mobAttackStarted = false;

  bot.on('spawn', () => {
    console.log('logging levle1 (checking)');
    loginAttempted = false;
    mobAttackStarted = false;
    
    setTimeout(() => {
      if (!mobAttackStarted) {
        startAttackingMobs();
      }
    }, 5023);
  });

  bot.on('message', (msg) => {
    const message = msg.toString();
    console.log('chat:', message);
    
    if ((message.includes('/login') || message.includes('login')) && !loginAttempted) {
      setTimeout(() => {
        bot.chat('/login passs');
        console.log('logging');
        loginAttempted = true;
        setTimeout(() => {
          if (!mobAttackStarted) {
            startAttackingMobs();
          }
        }, 3000);
      }, 2000);
    }
  });

  function startAttackingMobs() {
    if (mobAttackStarted) return;
    mobAttackStarted = true;
    
    if (attackInterval) clearInterval(attackInterval);
    
    console.log('starting george floyd pregnant killing system...');
    
    attackInterval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastAttackTime < attackCooldown) return;
      
      if (Math.random() < 0.3) return;
      
      const mobs = Object.values(bot.entities).filter(entity => {
        return entity !== bot.entity && 
               entity.position.distanceTo(bot.entity.position) < 3.5;
      });

      if (mobs.length > 0 && Math.random() < 0.8) {
        try {
          setTimeout(() => {
            const randomMob = mobs[Math.floor(Math.random() * mobs.length)];
            const randomOffsetX = (Math.random() - 0.5) * 0.3;
            const randomOffsetY = (Math.random() - 0.5) * 0.2;
            const lookPos = randomMob.position.offset(randomOffsetX, randomOffsetY, 0);
            
            bot.lookAt(lookPos);
            
            setTimeout(() => {
              bot.attack(randomMob);
              lastAttackTime = Date.now();
              attackCooldown = 962 + Math.random() * 800;
            }, 200 + Math.random() * 300);
          }, 300 + Math.random() * 500);
        } catch (error) {
          console.log('err:', error.message);
        }
      }
    }, 820 + Math.random() * 403);
  }

  bot.on('error', err => console.log('err:', err));
  
  bot.on('end', () => {
    console.log('reconnecting...');
    if (attackInterval) clearInterval(attackInterval);
    setTimeout(() => createBot(), 12031 + Math.random() * 4100);
  });
}

createBot();
