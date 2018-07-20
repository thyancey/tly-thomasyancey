

module.exports = {
  jobs:[
    {
      title: "Software Engineer - Mid",
      description: "Bla bla bla",
      theme: "",
      dividerTheme: "clouds-right",
      text: "This is some long text about this thing, it might go on for a while. It's probably got a whole bunch of detail and things to talk about. maybe there's links in here I have no idea! But it sure is long. A really long description.",
      company: "ozmo",
      responsibilities: ["one", "two", "three"],
      details:[
      ]
    },
    {
      title: "Software Engineer",
      description: "Some other stuff",
      theme: "",
      dividerTheme: "clouds-left",
      text: "This is some long text about this thing, it might go on for a while. It's probably got a whole bunch of detail and things to talk about. maybe there's links in here I have no idea! But it sure is long. A really long description.",
      company: "ozmo",
      responsibilities: ["oner", "twor", "threer"],
      details:[
      ]
    },
    {
      title: "Content Lead",
      description: "Some other stuff",
      text: "This is some long text about this thing, it might go on for a while. It's probably got a whole bunch of detail and things to talk about. maybe there's links in here I have no idea! But it sure is long. A really long description.",
      company: "ozmo",
      responsibilities: ["oner", "twor", "threer"],
      details:[
      ]
    },
    {
      title: "Content Lead",
      description: "Some other stuff",
      text: "This is some long text about this thing, it might go on for a while. It's probably got a whole bunch of detail and things to talk about. maybe there's links in here I have no idea! But it sure is long. A really long description.",
      company: "ozmo",
      responsibilities: ["oner", "twor", "threer"],
      details:[
      ]
    }
  ],
  projects:[
    {
      title: "Guitar App",
      description: "Music theory and learning tool",
      theme: "guitarapp",
      dividerTheme: "fretboard-right",
      text: "As one of my 10,000 hobbies, playing guitar is something I sorta know how to do, but I'm not very good at. I've been trying to go past chords and tabs and learn some more fundamental concepts of music theory. This is an app I made to learn notes and scales on a guitar",
      company: "ozmo",
      responsibilities: ["oner", "twor", "threer"],
      details:[
        {
          type: "definedLayout",
          title: "Fretboard",
          description: "Don't fret!",
          blorbs: [
            {
              width: "half",
              text: "This represents the neck of a variety of string instruments. The notes dynamically update based on your current key, scale, and/or chord configuration. Clicking the notes on the fretboad will play that MIDI note."
            },
            {
              width: "half",
              image: "project-guitarapp/guitarapp-03.jpg"
            }
          ]
        },
        {
          type: "definedLayout",
          title: "Sample",
          description: "Defined layout",
          blorbs: [
            {
              width: "half",
              text: "Here is some blorb text, it goes on for a while and it's here baby. It is here."
            },
            {
              width: "half",
              image: "project-guitarapp/guitarapp-01.jpg"
            },
            {
              width: "full",
              text: "Here is some more blorb text, it should span the whole damn thing! Text on its own line should probably go on for a while right? It has its own line for a reason."
            },
            {
              width: "half",
              image: "project-guitarapp/guitarapp-01.jpg"
            },
            {
              width: "half",
              image: "project-guitarapp/guitarapp-01.jpg"
            },
            {
              width: "half",
              text: "Here is some blorb text, it goes on for a while and it's here baby. It is here. I sure hope theres a really long image next to this, cause this text is long and will go on for a long time! Like WOW this is a whole lot of text. It just keeps going and going. Yep still going, it needs to. There's a really long image next to this so we want it to look good right?"
            },
            {
              width: "half",
              image: "project-guitarapp/guitarapp-03.jpg"
            },
          ]
        },
        {
          type: "definedLayout",
          title: "Key and Scale selection",
          description: "Music theory in practice",
          blorbs: [
            {
              width: "full",
              text: "I never had the chance to take a class in music theory, so I really had to wing this one and learn along the way. Using some common music patterns and simple arithmatic, you can select any key, scale, or instrument defined and the available notes will be calculated!"
            }
          ]
        },
        {
          type: "definedLayout",
          title: "Drag/Drop Layouts",
          description: "I'm not the best at UX, so just do whatever you want",
          blorbs: [
            {
              width: "full",
              text: "While designing this app, I kept changing my mind on which panels should go where. Especially when running it on a phone, tablet, or desktop, the needs for panels and layouts varies. The final thing was that this app serves different needs, some people won't need the fretboard, but may want the chord panel. To serve all these constraints, I made it so the user can rearrange the panels however they want. Layouts are saved to and loaded from localStorage for convenience."
            },
            {
              width: "full",
              image: "project-guitarapp/guitarapp-02.jpg"
            }
          ]
        }
      ]
    },
    {
      title: "Rotater",
      description: "React component for animating image sequences",
      theme: "",
      text: "A million years ago, I used to be really into 3D modeling and animation. I wanted to bring some form of depth into a relatively simple 2d implementation. I made a component that can take a sequence of images, and with the help of a little bit of fake physics, make it come to life",
      company: "ozmo",
      responsibilities: ["oner", "twor", "threer"],
      details:[
        {
          type: "definedLayout",
          title: "Simple definition file",
          description: "",
          blorbs: [
            {
              width: "half",
              text: "The component accepts only a few properties that are pretty easy to implement and understand. An image pattern lets you define the naming convention of your image sequence, or you could instead define all the image urls manually."
            },
            {
              width: "half",
              image: "project-rotater/jsonstructure.jpg"
            }
          ]
        },
        {
          type: "definedLayout",
          title: "Fake-o-physics",
          description: "",
          blorbs: [
            {
              width: "full",
              text: "I simulated some amount of velocity, acceleration, and drag to the rotation, so that when you gave it a spin, it seems more real."
            }
          ]
        }
      ]
    }
  ],
  companies:{
    ozmo:{},
    modea:{}
  }
}