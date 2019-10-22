import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment'
import withDragDropContext from './withDnDContext'
import React, { Component, useState }  from 'react'; 


/* const Basic = (schedulerData, events) => {
    const [viewModel, setViewModel] = useState(schedulerData)

    const prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(events);
        setViewModel(schedulerData);
      }
    
      const nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(events);
        setViewModel(schedulerData);
      }
    
      const onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(events);
        setViewModel(schedulerData);
      }
    
      const onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(events);
        setViewModel(schedulerData);
      }
    
      const eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
      };

      return(
        <Scheduler schedulerData={viewModel}
           prevClick={prevClick}
           nextClick={nextClick}
           onSelectDate={onSelectDate}
           onViewChange={onViewChange}
           eventItemClick={eventClicked}
      />
      );

}; */
let resources = [
  {
     id: 'r0',
     name: 'R1',
     groupOnly: true
  },
  {
     id: 'r1',
     name: 'R2'
  },
  {
     id: 'r2',
     name: 'R3',
  },
  {
     id: 'r3',
     name: 'R4',
  },
  {
     id: 'r4',
     name: 'R5',
  },
  {
    id: 'r5',
    name: 'R6',
  },
  {
    id: 'r6',
    name: 'R7',
  },

];

let events = [
  {
       id: 1,
       start: '2017-12-18 09:30:00',
       end: '2017-12-19 23:30:00',
       resourceId: 'r1',
       title: 'I am finished',
       bgColor: '#D9D9D9'
   }, 
   {
       id: 2,
       start: '2017-12-18 12:30:00',
       end: '2017-12-26 23:30:00',
       resourceId: 'r2',
       title: 'I am not resizable',
       resizable: false
   }, 
   {
       id: 3,
       start: '2017-12-19 12:30:00',
       end: '2017-12-20 23:30:00',
       resourceId: 'r3',
       title: 'I am not movable',
       movable: false
   }, 
   {
       id: 4,
       start: '2017-12-19 14:30:00',
       end: '2017-12-20 23:30:00',
       resourceId: 'r1',
       title: 'I am not start-resizable',
       startResizable: false
   }, 
   {
       id: 5,
       start: '2017-12-19 15:30:00',
       end: '2017-12-20 23:30:00',
       resourceId: 'r2',
       title: 'R2 has recurring tasks every week on Tuesday, Friday',
       rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
       bgColor: '#f759ab'
   }
];

class Basic extends Component{
  constructor(props){
      super(props);

      //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
      let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Day);
      moment.locale('zh-cn');
      schedulerData.setLocaleMoment(moment);
      schedulerData.setResources(resources);
      schedulerData.setEvents(events);
      this.state = {
          viewModel: schedulerData
      }
      
  }
  render(){
    const {viewModel} = this.state;
    return (
      <Scheduler schedulerData={viewModel}
           prevClick={this.prevClick}
           nextClick={this.nextClick}
           onSelectDate={this.onSelectDate}
           onViewChange={this.onViewChange}
           eventItemClick={this.eventClicked}
      />
    )
  }
  prevClick = (schedulerData)=> {
    schedulerData.prev();
    schedulerData.setEvents(events);
    this.setState({
        viewModel: schedulerData
    })
  }

  nextClick = (schedulerData)=> {
    schedulerData.next();
    schedulerData.setEvents(events);
    this.setState({
        viewModel: schedulerData
    })
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(events);
    this.setState({
        viewModel: schedulerData
    })
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(events);
    this.setState({
        viewModel: schedulerData
    })
  }

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
  };
};

export default withDragDropContext(Basic)