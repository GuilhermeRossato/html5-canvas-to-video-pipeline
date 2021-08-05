const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function getColor() {
    return [
        "#B5EAD7",
        "#C7CEEA",
        "#FFDAC1",
        "#E2F0CB",
        "#FF9AA2",
        "#FFB7B2"
    ][Math.random() * 6 | 0]
}

const balls = [
    {"index":0,"color":getColor(),"x":0,"y":0,"vx":0,"vy":0,"stage":0,"counter":0}
];

const particles = [];

let recording = false;

function update() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let ball of balls) {
        ball.counter = ball.counter + 1;
        if (ball.index === 0 && ball.counter%210 === 209) {
            balls.push({"index":1,"color":getColor(),"x":0,"y":0,"vx":0,"vy":0,"stage":0,"counter":0})
        }
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (
            ball.counter === Math.floor(1/6*(2106)) ||
            ball.counter === Math.floor(2/6*(2106)) ||
            ball.counter === Math.floor(3/6*(2106)) ||
            ball.counter === Math.floor(4/6*(2106)) ||
            ball.counter === Math.floor(5/6*(2106))
        ) {
            //console.log(JSON.stringify(ball));
        }
        switch (ball.stage) {
            case 0:
                ball.vx = 5;
                ball.stage = 1;
                break;
            case 1:
                if (ball.x > 1294) {
                    ball.x = 1295;
                    ball.y = ball.x - 1294;
                    ball.vx = 0;
                    ball.vy = 5;
                    ball.stage = 2;
                }
                break;
            case 2:
                if (ball.y > 665) {
                    ball.x = 1295 + (ball.y - 665);
                    ball.y = 666;
                    ball.vx = 5;
                    ball.vy = 0;
                    ball.stage = 3;
                }
                break;
            case 3:
                if (ball.x > 1904) {
                    ball.y = 666 + (ball.x - 1904);
                    ball.x = 1904;
                    ball.vx = 0;
                    ball.vy = -5;
                    ball.stage = 4;
                }
                break;
            case 4:
                if (ball.y <= 0) {
                    ball.x = 1904 - ball.y;
                    ball.y = 0;
                    ball.vx = -5;
                    ball.vy = 0;
                    ball.stage = 5;
                }
                break;
            case 5:
                if (ball.x < 1294) {
                    ball.y = 0 + (ball.x - 1294);
                    ball.x = 1294;
                    ball.vx = 0;
                    ball.vy = 5;
                    ball.stage = 6;
                }
                break;
            case 6:
                if (ball.y > 665) {
                    ball.x = 1294 + (ball.y - 665);
                    ball.y = 665;
                    ball.vx = 5;
                    ball.vy = 0;
                    ball.stage = 7;
                }
                break;
            case 7:
                if (ball.x > 1904) {
                    ball.y = 665 + (ball.x - 1904);
                    ball.x = 1905;
                    ball.vx = 0;
                    ball.vy = 5;
                    ball.stage = 8;
                }
                break;
            case 8:
                if (ball.y > 1062) {
                    ball.x = 1905 + (ball.y - 1062);
                    ball.y = 1063;
                    ball.vx = -5;
                    ball.vy = 0;
                    ball.stage = 9;
                }
                break;
            case 9:
                if (ball.x <= 1294) {
                    ball.y = 1063 - (1294 - ball.x);
                    ball.x = 1294;
                    ball.vx = 0;
                    ball.vy = -5;
                    ball.stage = 10;
                }
                break;
            case 10:
                if (ball.y <= 666) {
                    ball.x = 1294 + (666 - ball.y);
                    ball.y = 666;
                    ball.vx = 5;
                    ball.vy = 0;
                    ball.stage = 11;
                }
                break;
            case 11:
                if (ball.x > 1904) {
                    ball.y = 665 + (ball.x - 1904);
                    ball.x = 1905;
                    ball.vx = 0;
                    ball.vy = 5;
                    ball.stage = 12;
                }
                break;
            case 12:
                if (ball.y > 1062) {
                    ball.x = 1905 - (ball.y - 1062);
                    ball.y = 1063;
                    ball.vx = -5;
                    ball.vy = 0;
                    ball.stage = 13;
                }
                break;
            case 13:
                if (ball.x <= 0) {
                    ball.y = 1063 - ball.x;
                    ball.x = 0;
                    ball.vx = 0;
                    ball.vy = -5;
                    ball.stage = 14;
                }
                break;
            case 14:
                if (ball.y <= 0) {
                    ball.y = 0;
                    ball.x = - ball.y;
                    ball.vx = 5;
                    ball.vy = 0;
                    ball.stage = 1;
                    //console.log(ball.counter);
                    ball.counter = 0;

                    if (ball.index === 0) {
                        if (recording) {
                            recording = false;
                            console.log("Stopped recording");
                        } else {
                            recording = true;
                            console.log("Started recording");
                        }
                    }
                }
                break;
        }
        /*
        if (document.title !== ball.stage.toString()) {
            document.title = ball.stage.toString();
        }
        */
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x + 7, ball.y + 7, 7, 0, 2*Math.PI);
        ctx.fill();
        for (let i = 0; i < 2 ; i++) {
            const particle = {
                x: ball.x + Math.random() * 10,
                y: ball.y + Math.random() * 10,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                color: ball.color,
                maxLife: 60
            }
            particles.push(particle);
        }
    }
    for (let i = particles.length-1; i >= 0; i--) {
        if (!particles[i]) {
            continue;
        }
        if (particles[i].life <= 0) {
            delete particles[i];
            continue;
        }
        if (particles[i].life === undefined || particles[i].life === null) {
            particles[i].life = particles[i].maxLife;
        }
        particles[i].life -= 1;
        particles[i].radius = (particles[i].life / particles[i].maxLife) * 3.5;
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;
        ctx.fillStyle = particles[i].color;
        ctx.beginPath();
        ctx.moveTo(particles[i].x - particles[i].radius/2, particles[i].y);
        ctx.arc(particles[i].x + particles[i].radius/2, particles[i].y + particles[i].radius/2, particles[i].radius, 0, 2*Math.PI);
        ctx.fill();
    }
    if (false && recording) {
        sendCanvasBinaryToServer().then(update).catch(console.log);
    } else {
        requestAnimationFrame(update);
    }
}

async function sendCanvasBinaryToServer() {
    // Convert canvas image to Base64
    const img = canvas.toDataURL();
    // Convert Base64 image to binary
    const file = dataURItoBlob(img);

    const response = await fetch('http://localhost:8081',{
        method: 'post',
        body: file
    });
    const text = await response.text();
    if (text === "") {
        return;
    }
    throw new Error("Server error: " + text);
}

function dataURItoBlob(dataURI) {
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
  } else {
      byteString = unescape(dataURI.split(',')[1]);
  }
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type:mimeString});
}

update();