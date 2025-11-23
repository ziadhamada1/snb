// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// // Scroll to Top Button
// const scrollBtn = document.getElementById('scrollTopBtn');
// window.addEventListener('scroll', () => {
//   if (window.scrollY > 300) {
//     scrollBtn.classList.add('show');
//   } else {
//     scrollBtn.classList.remove('show');
//   }
// });
// scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Dark/Light Mode
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.innerHTML = document.body.classList.contains('dark-mode') 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
});






/* ===== معرض الصور Full Screen ===== */
const galleryImages = document.querySelectorAll(".gallery-img");
const viewer = document.getElementById("fullscreenViewer");
const fullImage = document.getElementById("fullImage");
const closeViewer = document.getElementById("closeViewer");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    fullImage.src = img.src;
    viewer.style.display = "flex";
  });
});

closeViewer.addEventListener("click", () => {
  viewer.style.display = "none";
});

viewer.addEventListener("click", (e) => {
  if (e.target === viewer) viewer.style.display = "none";
});







// const canvas = document.getElementById("stars");
// const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// let stars = [];
// let mouse = { x: null, y: null };

// window.addEventListener("mousemove", (e) => {
//   mouse.x = e.x;
//   mouse.y = e.y;
// });

// function createStars() {
//   for (let i = 0; i < 350; i++) {
//     stars.push({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       size: Math.random() * 2,
//       speed: Math.random() * 0.5,
//     });
//   }
// }

// function animateStars() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   stars.forEach((star) => {
//     // حركة بسيطة
//     star.y -= star.speed;
//     if (star.y <= 0) star.y = canvas.height;

//     // تأثير الماوس (سحب النجوم)
//     if (mouse.x && mouse.y) {
//       let dx = star.x - mouse.x;
//       let dy = star.y - mouse.y;
//       let dist = Math.sqrt(dx * dx + dy * dy);

//       if (dist < 120) {
//         star.x += dx / dist * 2;
//         star.y += dy / dist * 2;
//       }
//     }

// ctx.shadowColor = "#ffd700";
// ctx.shadowBlur = 10;
// ctx.fillStyle = "#fff8b0";


//     ctx.fillRect(star.x, star.y, star.size, star.size);
//   });

//   requestAnimationFrame(animateStars);
// }

// createStars();
// animateStars();

// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });






window.addEventListener('load', () => {
  setTimeout(() => {
    explodeText();
  }, 2000);
});


function explodeText() {
  const text = document.getElementById("explode-text");
  const canvas = document.getElementById("explosion-canvas");
  const ctx = canvas.getContext("2d");
  // const sound = document.getElementById("boom-sound");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // تشغيل صوت الانفجار 🔊💥
  // sound.volume = 0.8;
  // sound.play();

  text.style.opacity = "0";
  canvas.style.display = "block";

  const particles = [];
  const colors = ["#ff0000", "#ff6a00", "#ffaa00", "#ffff00", "#ffffff", "#ff4500"];

  const textX = canvas.width / 2;
  const textY = canvas.height / 2;

  ctx.fillStyle = "#fff";
  ctx.font = "bold 70px Arial";
  ctx.textAlign = "center";
  ctx.fillText(text.textContent, textX, textY);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // إنشاء Particles من النار والدخان
  for (let y = 0; y < imageData.height; y += 3) {
    for (let x = 0; x < imageData.width; x += 3) {
      const index = (y * imageData.width + x) * 4;
      if (imageData.data[index + 3] > 128) {
        particles.push({
          x,
          y,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 25,  // 🔥 سرعة عالية جداً
          speedY: (Math.random() - 0.5) * 25,
          gravity: Math.random() * 0.4 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1,
          decay: Math.random() * 0.02 + 0.01
        });
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY + p.gravity;
      p.life -= p.decay;

      ctx.globalAlpha = p.life;

      // 🔥 توهج ناري + دخان
      ctx.shadowBlur = 20;
      ctx.shadowColor = p.color;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // لو انتهت كل الجزيئات → اختفاء اللودر
    if (particles.every(p => p.life <= 0)) {
      document.body.classList.add("loaded");
      return;
    }

    requestAnimationFrame(animate);
  }

  animate();
}

  















try {
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 500,
        "density": {
          "enable": true,
          "value_area": 1600
        }
      },
      "color": {"value": "#fff"},
      "shape": {"type": "star"},
      "opacity": {"value": 0.9, "random": true},
      "size": {"value": 3, "random": true},
      "line_linked": {"enable": false},
      "move": {
        "enable": true,
        "speed": 0.6,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out"
      }
    },
    "interactivity": {
      "detect_on": "window",
      "events": {
        "onmousemove": {"enable": true, "mode": "repulse"},
        "onclick": {"enable": false}
      },
      "modes": {
        "repulse": {"distance": 100, "duration": 0.4}
      }
    },
    "retina_detect": true
  });
} catch (e) {
  console.warn("particles.js error:", e.message);
}


const rocketBtn = document.getElementById("rocketBtn");
const smokeContainer = document.getElementById("smokeContainer");

rocketBtn.addEventListener("click", () => {
  // التمرير لأعلى فورًا
  window.scrollTo({ top: 0, behavior: "smooth" });

  // إضافة كلاس الانطلاق للدخان والصاروخ
  rocketBtn.classList.add("rocket-launch");

  // إنشاء دخان أثناء الانطلاق
  const puffCount = 5;
  for (let i = 0; i < puffCount; i++) {
    setTimeout(() => {
      const puff = document.createElement("div");
      puff.classList.add("smoke-puff");
      puff.style.left = `${Math.random() * 30 - 15}px`;
      smokeContainer.appendChild(puff);
      puff.addEventListener("animationend", () => puff.remove());
    }, i * 200);
  }

  // إزالة كلاس الانطلاق بعد انتهاء الانميشن
  setTimeout(() => {
    rocketBtn.classList.remove("rocket-launch");
  }, 2500);
});

// إظهار الزر عند التمرير لأسفل أكثر من 200px
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    rocketBtn.classList.add("rocket-show");
  } else {
    rocketBtn.classList.remove("rocket-show");
  }
});





const btn = document.getElementById("chatbot-btn");
const windowBot = document.getElementById("chatbot-window");
const closeBtn = document.getElementById("chatbot-close");
const messages = document.getElementById("chatbot-messages");
const input = document.getElementById("chatbot-input");

// فتح وإغلاق الشات
btn.addEventListener("click", () => windowBot.style.display = "flex");
closeBtn.addEventListener("click", () => windowBot.style.display = "none");

// إرسال السؤال عند الضغط على Enter
input.addEventListener("keydown", async (e) => {
  if(e.key === "Enter" && input.value.trim() !== "") {
    const userMsg = input.value;
    addMessage("user", userMsg);
    input.value = "";

    // رسالة مؤقتة للبوت مع مؤشر typing
    const botTyping = addMessage("bot", "جارٍ الرد...");
    botTyping.classList.add("typing");

    try {
      const botReply = await getChatGPTResponse(userMsg);
      botTyping.classList.remove("typing");
      botTyping.textContent = botReply;
    } catch(err) {
      botTyping.classList.remove("typing");
      botTyping.textContent = "❌ حدث خطأ. حاول مرة أخرى.";
      console.error(err);
    }
  }
});

// إضافة رسالة وإرجاع العنصر لتعديل النص لاحقاً
function addMessage(sender, text){
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

// ⚡ استدعاء OpenAI API مباشرة من الفرونت
async function getChatGPTResponse(question){
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {role:"system", content:"أنت شات بوت تعليمي يجيب على جميع أسئلة الطلاب بطريقة بسيطة وواضحة."},
        {role:"user", content: question}
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
