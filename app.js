/* ==================================================
   ELEMENTS
================================================== */

const introScreen =
    document.getElementById(
        "introScreen"
    );

const messageScreen =
    document.getElementById(
        "messageScreen"
    );

const cameraScreen =
    document.getElementById(
        "cameraScreen"
    );

const endScreen =
    document.getElementById(
        "endScreen"
    );


const moods =
    document.querySelectorAll(
        ".mood"
    );


const messageEyebrow =
    document.getElementById(
        "messageEyebrow"
    );

const messageTitle =
    document.getElementById(
        "messageTitle"
    );

const messageText =
    document.getElementById(
        "messageText"
    );


const breakButton =
    document.getElementById(
        "breakButton"
    );

const backButton =
    document.getElementById(
        "backButton"
    );

const doneButton =
    document.getElementById(
        "doneButton"
    );

const restartButton =
    document.getElementById(
        "restartButton"
    );


const camera =
    document.getElementById(
        "camera"
    );

const cameraMessage =
    document.getElementById(
        "cameraMessage"
    );


const music =
    document.getElementById(
        "music"
    );


let currentMood = null;

let cameraStream = null;


/* ==================================================
   MOOD DATA
================================================== */

const moodData = {

    good: {

        eyebrow:
            "THAT'S NICE TO HEAR",

        title:
            "I'm glad today was kind to you.",

        text:
            "Keep a little bit of that feeling with you tonight. You deserve peaceful days too.",

        camera:
            "Okay, this one is for the good days. Stay here for a little while."

    },


    calm: {

        eyebrow:
            "KEEP THIS FEELING",

        title:
            "Some days don't need to be exciting.",

        text:
            "Sometimes a quiet, ordinary day is already something worth being grateful for.",

        camera:
            "No rush. You can just enjoy the quiet for a moment."

    },


    tired: {

        eyebrow:
            "JUST A LITTLE REMINDER",

        title:
            "You did your best today.",

        text:
            "Maybe today wasn't easy. But you showed up, you got through it, and that's enough for today.",

        camera:
            "You don't have to fix anything right now. Just breathe."

    },


    exhausted: {

        eyebrow:
            "HEY, IT'S OKAY",

        title:
            "You don't have to carry today anymore.",

        text:
            "It's okay to be tired. You don't have to be strong every single day. You've done enough.",

        camera:
            "No questions. No expectations. Just a little moment for yourself."

    },


    happy: {

        eyebrow:
            "I LIKE THIS ONE",

        title:
            "I hope you keep this feeling.",

        text:
            "Whatever made you smile today, I hope you get a little more of it tomorrow.",

        camera:
            "Okay, keep that smile if you have one. But no pressure."

    },


    okay: {

        eyebrow:
            "THAT'S ALLOWED TOO",

        title:
            "Not every day has to be amazing.",

        text:
            "Some days are just... okay. And that's completely fine. Tomorrow is another day.",

        camera:
            "No need to make today better. Just let it end peacefully."

    },


    dontask: {

        eyebrow:
            "UNDERSTOOD",

        title:
            "No questions asked.",

        text:
            "Whatever happened today, you made it to the other side. That's enough information for tonight.",

        camera:
            "We won't talk about it. Just breathe for a little while."

    }

};


/* ==================================================
   SCREEN SWITCH
================================================== */

function showScreen(
    screen
) {

    document
        .querySelectorAll(
            ".screen"
        )
        .forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


    screen.classList.add(
        "active"
    );
}


/* ==================================================
   MUSIC
================================================== */

function startMusic() {

    music.volume = 0.18;

    const promise =
        music.play();

    if (
        promise &&
        promise.catch
    ) {

        promise.catch(
            () => {

                /*
                 * Browser may block
                 * autoplay.
                 *
                 * That's okay.
                 * Music can start after
                 * another user interaction.
                 */

            }
        );

    }

}


/* ==================================================
   MOOD SELECTION
================================================== */

moods.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const mood =
                    button.dataset.mood;

                currentMood =
                    mood;

                const data =
                    moodData[mood];


                messageEyebrow.textContent =
                    data.eyebrow;

                messageTitle.textContent =
                    data.title;

                messageText.textContent =
                    data.text;

                cameraMessage.textContent =
    data.camera;


startMusic();


showScreen(
    messageScreen
);

if (mood === "dontask") {
    breakButton.style.display = "none";
} else {
    breakButton.style.display = "";
}

            }
        );

    }
);


/* ==================================================
   CAMERA
================================================== */

async function startCamera() {

    try {

        cameraStream =
            await navigator
                .mediaDevices
                .getUserMedia({

                    video: {

                        facingMode:
                            "user"

                    },

                    audio: false

                });


        
           camera.srcObject = cameraStream;

camera.style.setProperty(
    "transform",
    "scaleX(-1)",
    "important"
);


        await camera.play();

    }

    catch (error) {

        console.error(
            "Camera error:",
            error
        );


        cameraMessage.textContent =
            "Camera couldn't be opened. That's okay — you can still take a little break here.";


        /*
         * Don't block the experience
         * if camera permission fails.
         */

    }

}

/* ==================================================
   BACK TO MOOD
================================================== */

backButton.addEventListener(
    "click",
    () => {

        showScreen(
            introScreen
        );

    }
);

/* ==================================================
   OPEN CAMERA
================================================== */

breakButton.addEventListener(
    "click",
    async () => {

        showScreen(
            cameraScreen
        );


        /*
         * Start camera AFTER
         * user explicitly clicks.
         *
         * This makes browser
         * permission behavior nicer.
         */

        await startCamera();

    }
);


/* ==================================================
   STOP CAMERA
================================================== */

function stopCamera() {

    if (!cameraStream) {
        return;
    }


    cameraStream
        .getTracks()
        .forEach(
            track => {

                track.stop();

            }
        );


    cameraStream = null;

    camera.srcObject = null;

}


/* ==================================================
   DONE
================================================== */

doneButton.addEventListener(
    "click",
    () => {

        stopCamera();

        showScreen(
            endScreen
        );

    }
);


/* ==================================================
   RESTART
================================================== */

restartButton.addEventListener(
    "click",
    () => {

        showScreen(
            introScreen
        );

    }
);