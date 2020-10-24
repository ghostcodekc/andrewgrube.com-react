import React, { Component } from 'react';

class Resume extends Component {
  render() {
    if(this.props.data){
      var education = this.props.data.education.map(function(education){
        return <div key={education.school}><h3>{education.school}</h3>
        <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
        <p>{education.description}</p></div>
      })
      var work = this.props.data.work.map(function(work, index){
        return <div key={work.company}><h3>{work.company}</h3>
        {
          work.title.map(function(title, index){
          function getItems(index){
            let p = work.item[index].map(function(item, index){
              let p = <p key={index}> &bull; {item}</p>
              return p
            })
            return p
          }
          let item = getItems(index)
          return <div key={index}><p className="info" key={title}>{title}<span>&bull;</span><em className="date" key={work.years[index]}>{work.years[index]}</em></p>{item}</div>
          })
        }
        </div>
      })
    }

    return (
      <section id="resume">
      <div className="row education">
         <div className="three columns header-col">
            <h1><span>Education</span></h1>
         </div>

         <div className="nine columns main-col">
            <div className="row item">
               <div className="twelve columns">
                 {education}
               </div>
            </div>
         </div>
      </div>


      <div className="row work">

         <div className="three columns header-col">
            <h1><span>Work</span></h1>
         </div>

         <div className="nine columns main-col">
          {work}
        </div>
    </div>
   </section>
    );
  }
}

export default Resume;
