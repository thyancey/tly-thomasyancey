

module.exports = [
  {
    title: "Guitar App",
    description: "Music theory and learning tool",
    links: "hey there buddy",
    theme: "guitarapp",
    dividerTheme: "fretboard-right",
    text: "As one of my 10,000 hobbies, playing guitar is something I sorta know how to do, but I'm not very good at. I've been trying to go past chords and tabs and learn some more fundamental concepts of music theory. This is an app I made to learn notes and scales on a guitar",
    listGroups: [
      {
        title: "Links",
        items:[
          {
            type: "link",
            text: "CHECK IT OUT!",
            url: "http://www.thomasyancey.com/projects/guitarapp/index.html"
          },
          {
            type: "link",
            text: "Fork it on GitHub",
            url: "https://github.com/thyancey/tly-guitarapp"
          }
        ]
      }
    ],
    details:[
      {
        title: "Drag/Drop Layouts",
        description: "I'm not the best at UX, so just do whatever you want",
        blorbs: [
          [
            {
              width: "full",
              text: "While designing this app, I kept changing my mind on which panels should go where. Especially when running it on a phone, tablet, or desktop, the needs for panels and layouts varies. The final thing was that this app serves different needs, some people won't need the fretboard, but may want the chord panel. To serve all these constraints, I made it so the user can rearrange the panels however they want. Layouts are saved to and loaded from localStorage for convenience."
            },
            {
              width: "full",
              image: "project-guitarapp/guitarapp-02.jpg"
            }
          ]
        ]
      },
      {
        title: "About the key and scale selection",
        description: "Music theory in practice",
        blorbs: [
          [
            {
              width: "full",
              text: [
                "I never had the chance to take a class in music theory, so I really had to wing this one and learn along the way. Using some common music patterns and simple arithmatic, you can select any key, scale, or instrument defined and the available notes will be calculated!",
                "I hit a wall when trying to calculate chords and scale shapes. I got sort of close, but since the fingerings are sort of subjective on what is comfortable for the human hand, I had to fall back to manually entering chord fingerings.",
                "I also need to figure out how to predict chords used in non-western scales. For example, the western major scale uses the major triad, which uses chords of its notes in the (triads? I'm winging it here) of [ major, minor, minor, major, major, minor, diminished, major ]"
              ]
            }
          ]
        ]
      },
      {
        title: "About the fretboard",
        description: "",
        blorbs: [
          [
            {
              width: "half",
              text: [
                "This represents the neck of a variety of string instruments. The notes dynamically update based on your current key, scale, and/or chord configuration.",
                "Clicking the notes on the fretboad will play that MIDI note.",
                "It was a little tricky, but I got it so it will work for multiple instruments, even wacky ones like a banjo. In the future, I'll try to update the look a little better and figure out how to add support for fretless instruments.",
              ]
            },
            {
              width: "half",
              image: "project-guitarapp/guitarapp-03.jpg"
            }
          ]
        ]
      }
    ]
  },
  {
    title: "Rotater",
    description: "React component for animating image sequences",
    linkTitle: "",
    theme: "",
    dividerTheme: "clouds-left",
    text: "A million years ago, I used to be really into 3D modeling and animation. I wanted to bring some form of depth into a relatively simple 2d implementation. I made a component that can take a sequence of images, and with the help of a little bit of fake physics, make it come to life",
    listGroups: [
      {
        title: "Links",
        items:[
          {
            type: "link",
            text: "CHECK IT OUT!",
            url: "http://www.thomasyancey.com/projects/rotater/index.html"
          },
          {
            type: "link",
            text: "Fork it on GitHub",
            url: "https://github.com/thyancey/tly-rotater"
          }
        ]
      }
    ],
    details:[
      {
        title: "Simple definition file",
        description: "",
        blorbs: [
          [
            {
              width: "half",
              text: "The component accepts only a few properties that are pretty easy to implement and understand. An image pattern lets you define the naming convention of your image sequence, or you could instead define all the image urls manually."
            },
            {
              width: "half",
              image: "project-rotater/jsonstructure.jpg"
            }
          ]
        ]
      },
      {
        title: "Fake-o-physics",
        description: "",
        blorbs: [
          [
            {
              width: "full",
              text: "I simulated some amount of velocity, acceleration, and drag to the rotation, so that when you gave it a spin, it seems more real."
            }
          ]
        ]
      }
    ]
  }
];