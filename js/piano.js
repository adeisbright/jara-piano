//create a synth and connect it to the main output (your speakers)
const selector = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
const createElement = (e) => document.createElement(e);

const pianoKeys = Array.from(selectAll(".mkey"));

//Iterate pianoKeys
pianoKeys.map((key) => {
    //Form a pattern for how to extract notes + registry
    const pattern = /\w{1}\d{1}/g;
    // Get the entire class list for the particular button
    const cList = Array.from(key.classList);
    // Set the default octave or registry to 1

    let octave = 1;

    // Check for the registry pattern in the classlist
    if (cList.join("").match(pattern)) {
        let pos = cList.join("").match(pattern);
        octave = pos[0][1];
    }
    // Get the specific key a user just clicks
    let hasNote = key.getAttribute("data-key");
    const note = hasNote ? hasNote : "C";

    key.addEventListener("click", (e) => {
        e.preventDefault();

        const synthentizer = new Tone.Synth().toDestination();
        Tone.start();
        synthentizer.triggerAttackRelease(`${note}${octave}`, "8n");
    });
});

//Listen to key press event
// Playing the piano by keypress will come here
window.addEventListener("keypress", (e) => {
    e.preventDefault();
    console.log(e);
});
