import React from 'react';
import resume from "./resume.pdf";

class AboutContent extends React.Component {
  render() {
    return (
      <div className="about-content">
        <p>
          Hi there!{' '}
          <span aria-label="hand-wave" role="img">
            👋
          </span>
        </p>
        <p>
          My name is Dustin and I'm a web{' '}
          <span aria-label="spider" role="img">
            🕷
          </span>{' '}
          developer who loves making tech that makes a{' '}
          <span aria-label="sparkles" role="img">
            ✨
          </span>{' '}
          positive{' '}
          <span aria-label="sparkles" role="img">
            ✨
          </span>{' '}
          influence on people's lives. I am really passionate about building scalable{' '}
          <span aria-label="snake" role="img">
            🐍
          </span>{' '}
          systems for web applications and learning new technologies.
          I tend to obsess over squeezing every last ounce of efficiency{' '}
          <span aria-label="lightning" role="img">
            ⚡
          </span>{' '}
          out of anything I make.
        </p>
        <p>
          I'm a Linguistics{' '}
          <span aria-label="tree" role="img">
            🌳
          </span>{' '}
          and Computer Science{' '}
          <span aria-label="rocket" role="img">
            🚀
          </span>{' '}
          major at <a href="https://ucla.edu">UCLA</a>,{' '}
          <span aria-label="bear" role="img">
            🐻
          </span>{' '}
          graduating June 2020.
        </p>
        <p>
          You can find me on{' '}
          <span aria-label="octopus" role="img">
            🐙
          </span>{' '}
          <a href="https://github.com/dustinnewman98">GitHub</a>{' '}
          <span aria-label="cat" role="img">
            🐱
          </span>, <a href="https://linkedin.com/in/dustinnewman98">LinkedIn</a>,
          or <a href="https://twitter.com/dustinnewman98">Twitter</a>{' '}
          <span aria-label="bird" role="img">
            🐥
          </span>, or shoot me an{' '}
          <a href="mailto:dustinnewman98@gmail.com">email</a>.{' '}
          <span aria-label="mailbox" role="img">
            📬
          </span>
        </p>
        <p>
          You can find my <a href={resume}>resume here</a>.
        </p>
        <p>
          Thanks!{' '}
          <span aria-label="smiley" role="img">
            😄
          </span>
        </p>
      </div>
    );
  }
}
export default AboutContent;
