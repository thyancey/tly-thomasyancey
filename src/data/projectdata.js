

module.exports = [
  {
    title: "Virtual Pet",
    description: "like a tom-a-got-yee",
    links: "hey there buddy",
    theme: "",
    dividerTheme: "clouds-left",
    text: "todo: title",
    listGroups: [
      {
        title: "Links",
        items:[
          {
            type: "link",
            text: "CHECK IT OUT!",
            url: "//www.thomasyancey.com/projects/virtualpet/index.html"
          },
          {
            type: "link",
            text: "Fork it on GitHub",
            url: "//github.com/thyancey/tly-virtualpet"
          }
        ]
      }
    ],
    details:[
      {
        title: "01",
        description: "Little dudes that live in your browser",
        blorbs: [
          [
            {
              width: "full",
              text: "Make any pet that you want, give them custom stats and they'll live in your browser! Stats update with time (even when you arent using the site). Keep that little guy fed now"
            },
            {
              width: "full",
              image: "project-virtualpet/virtualpet-01.png"
            }
          ]
        ]
      },
      {
        title: "Stats, states, and actions",
        description: "",
        blorbs: [
          [
            {
              width: "half",
              text: [
                "This is some long text about stats and status.",
                "Talk about how they come together",
                "Overall, this does this and that, which makes the experience good",
              ]
            },
            {
              width: "half",
              image: "project-virtualpet/virtualpet-02.png"
            }
          ]
        ]
      },
      {
        title: "behavior loop",
        description: "",
        blorbs: [
          [
            {
              width: "full",
              text: [
                "Driving all of the stats and everything",
                "Explain the loop in detail",
                "The result is the ability to make anything! change what you want, add any stats, etc",
              ]
            },
            {
              width: "full",
              image: "project-virtualpet/virtualpet-04.png"
            }
          ]
        ]
      },
      {
        title: "make anything!",
        description: "",
        blorbs: [
          [
            {
              width: "half",
              text: [
                "Some stuff about how the app is loose on purpose. As long as you can animate it, you can make it a desktop pet! Maybe put mona lisa painting or other thing, multiple xamples",
                "Some stuff about the pet attribute breakdown and image overlays",
                "Tie it up with talking about the stats and persistent stuff again",
              ]
            },
            {
              width: "half",
              image: "project-virtualpet/virtualpet-03.png"
            },
            {
              width: "full",
              type: "link",
              link: "//thomasyancey.com/projects/virtualpet/index.html",
              linkText: "check it out now!"
            }
          ]
        ]
      },
    ]
  },
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
            url: "//www.thomasyancey.com/projects/guitarapp/index.html"
          },
          {
            type: "link",
            text: "Fork it on GitHub",
            url: "//github.com/thyancey/tly-guitarapp"
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
    title: "Yanzee",
    description: "A drawing game that you play with friends",
    linkTitle: "",
    theme: "",
    dividerTheme: "clouds-left",
    text: "bla balbalbalbal game",
    listGroups: [
      {
        title: "Links",
        items:[
          {
            type: "link",
            text: "Play the beta now!",
            url: "//www.thomasyancey.com/projects/yanzee/index.html"
          }
        ]
      }
    ],
    details:[
      {
        title: "What is this game",
        description: "I wanted my own pictionary game",
        blorbs: [
          [
            {
              width: "half",
              text: "something about a good pictionary game"
            },
            {
              width: "half",
              image: "project-yanzee/yanzee-02.png"
            },
          ]
        ]
      },
      {
        title: "but its not just gonna be drawings!",
        description: "",
        blorbs: [
          [
            {
              width: "half",
              text: "custom word lists"
            },
            {
              width: "half",
              image: "project-yanzee/yanzee-03.png"
            },
            {
              width: "half",
              image: "project-yanzee/yanzee-04.png"
            },
            {
              width: "half",
              text: "share images and vote"
            },
          ]
        ]
      },
      {
        title: "Hows it made, whats left",
        description: "",
        blorbs: [
          [
            {
              width: "half",
              text: "gotta figure out server stuff"
            },
            {
              width: "half",
              image: "project-yanzee/yanzee-01.png"
            }
          ]
        ]
      }
    ]
  },
  {
    title: "Raccoon Trapper",
    description: "Phaser JS game",
    linkTitle: "",
    theme: "",
    dividerTheme: "clouds-left",
    text: "bla balbalbalbal game",
    listGroups: [
      {
        title: "Links",
        items:[
          {
            type: "link",
            text: "CHECK IT OUT!",
            url: "//www.thomasyancey.com/projects/raccoontrapper/index.html"
          }
        ]
      }
    ],
    details:[
      {
        title: "What is this game",
        description: "",
        blorbs: [
          [
            {
              width: "full",
              text: "raccoon trapper is a wild bal bal"
            },
            {
              width: "full",
              image: "project-raccoontrapper/raccoontrapper-01.png"
            },
          ]
        ]
      },
      {
        title: "learning sprites and things",
        description: "",
        blorbs: [
          [
            {
              width: "half",
              text: "blabla stuff about aseprite"
            },
            {
              width: "half",
              image: "project-raccoontrapper/sample-oldlady.gif"
            },
            {
              width: "half",
              image: "project-raccoontrapper/sample-oldlady.gif"
            },
            {
              width: "half",
              image: "project-raccoontrapper/sample-raccoon.gif"
            }
          ]
        ]
      },
      {
        title: "About phaser and stuff",
        description: "",
        blorbs: [
          [
            {
              width: "full",
              text: "overview of the gameplay, tapper inspiration, put some junk in about why its like flash and talk about hte code, etc"
            },
            {
              width: "half",
              image: "project-raccoontrapper/phaser-logo.png"
            },
            {
              width: "half",
              image: "project-rotater/jsonstructure.jpg"
            }
          ]
        ]
      }
    ]
  },
  {
    title: "Office Dashboard",
    description: "A persistent dashboard with touch events",
    linkTitle: "",
    theme: "",
    dividerTheme: "clouds-left",
    text: "At Ozmo, I had the opportunity to pitch an idea for a dashboard to show analytics, company events, new hires, birthdays, etc. We were able to get a large touch screen display to power it",
    listGroups: [],
    details:[
      {
        title: "Jumpin between iframes",
        description: "",
        blorbs: [
          [
            {
              width: "full",
              text: "The dashboard is basically an iframe slideshow, with a few built in pages"
            },
            {
              width: "full",
              image: "project-rotater/jsonstructure.jpg"
            }
          ]
        ]
      },
      {
        title: "On at the right times",
        description: "",
        blorbs: [
          [
            {
              width: "half",
              text: "I had a few people help me get a pi4 setup on rasbian. The computer hides behind the screen, and also controls turning on/turning off the display. On launch, it loads the internal site. Any updates to the dashboard can be deployed at anytime without touching hardware"
            },
            {
              width: "half",
              image: "project-rotater/jsonstructure.jpg"
            }
          ]
        ]
      },
      {
        title: "Details! Dogs! Data!",
        description: "",
        blorbs: [
          [
            {
              width: "half",
              text: "After about a year of use, we integrated with our HR system's API to pull user info. We even put a setup together for keeping track of dog birthdays :)"
            },
            {
              width: "half",
              image: "project-rotater/jsonstructure.jpg"
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
            url: "//www.thomasyancey.com/projects/rotater/index.html"
          },
          {
            type: "link",
            text: "Fork it on GitHub",
            url: "//github.com/thyancey/tly-rotater"
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
  },
  {
    title: "Other projects",
    description: "Just a bunch a random little things",
    linkTitle: "",
    theme: "",
    dividerTheme: "clouds-left",
    text: "I like to make web apps for fun, so I tend to jump around a lot",
    listGroups: [],
    details:[
      {
        title: "Bingotown",
        description: "",
        blorbs: [
          [
            {
              width: "full",
              link: "http://www.google.com",
              linkText: "check it out now"
            },
            {
              width: "half",
              text: [
                "It's bingo"
              ],
            },
            {
              width: "half",
              image: "project-rotater/jsonstructure.jpg"
            }
          ]
        ]
      },
      {
        title: "Feud",
        description: "",
        blorbs: [
          [
            {
              width: "half",
              image: "project-rotater/jsonstructure.jpg"
            },
            {
              width: "half",
              text: [
                "Bla bla did it for work"
              ],
            }
          ]
        ]
      },
      {
        title: "Nerftillery",
        description: "",
        blorbs: [
          [
            {
              width: "half",
              text: [
                "An app that controls a turret"
              ],
            },
            {
              width: "half",
              image: "project-rotater/jsonstructure.jpg"
            }
          ]
        ]
      },
      {
        title: "Extreme cat attack",
        description: "A few different games under a similar theme",
        blorbs: [
          [
            {
              width: "half",
              text: [
                "This was the first large game I made (and never finished)"
              ],
            },
            {
              width: "half",
              image: "project-rotater/jsonstructure.jpg"
            }
          ],
          [
            {
              width: "half",
              image: "project-rotater/jsonstructure.jpg"
            },
            {
              width: "half",
              text: [
                "Then I made this mobile one"
              ],
            }
          ]
        ]
      }
    ]
  }
];