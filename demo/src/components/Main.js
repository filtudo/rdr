import React, { Component } from 'react';
import moment from 'moment';
import { DateRange } from '../../../lib';
import Section from 'components/Section';

import 'normalize.css';
import 'styles/global'
import styles from 'styles/main';
import '../../../src/styles.css';


const buttonComp = () => (
  <button className="rdr-button" type="button">Übernehmen</button>
);

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      'rangePicker' : {
        'startDate': moment('10/02/2018', 'DD/MM/YYYY'),
        'endDate':  moment('22/04/2018', 'DD/MM/YYYY')
      },
      'rangePickerMobile' : {},
      'linked' : {},
      'datePicker' : null,
      'datePickerInternational': null,
      'firstDayOfWeek' : null,
      'predefined' : {},
      'linkedCalendars': !this.isMobile(),
      'calendars': this.isMobile() ? 1 : 2,
      'theme': this.getTheme()
    }
  }

  isMobile(){
    return typeof window !== 'undefined' && window.innerWidth <= 720;
  }

  handleChange(which, payload) {
    this.setState({
      [which] : payload
    });
  }

  getTheme(){
    if( this.isMobile()){
      return {
        Calendar: {
          width: window.innerWidth
        }
      }
    }
    return {}
  }

  handleResize(e) {
    // if is mobile
    if( this.isMobile()){
      this.setState({
        theme: this.getTheme(),
        linkedCalendars: false,
        calendars: 1,
      });
    } else if(!this.state.linkedCalendars) {
      this.setState({
        theme: this.getTheme(),
        linkedCalendars: true,
        calendars: 2,
      });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

 componentWillUnmount() {
   window.removeEventListener('resize', this.handleResize.bind(this));
 }

  render() {
    const {
        rangePicker,
        rangePickerMobile,
        linked,
        datePicker,
        firstDayOfWeek,
        predefined,
        datePickerInternational,
        calendars
    } = this.state;
    const format = 'dddd, D MMMM YYYY';
    return (
      <main className={styles['Main']}>

        <h1 className={styles['Title']}>React-date-range</h1>

        <Section title='Range Picker'>
          <div style={{display: 'block'}}>
            <input
              type='text'
              value={ rangePicker['startDate'].format('DD/MM/YYYY') }
              onChange={(event) => {
                event.preventDefault;
                if(event.target.value !== undefined){
                  this.setState({rangePicker:{
                    startDate: moment(event.target.value, 'DD/MM/YYYY'),
                    endDate: rangePicker['endDate'],
                  }})
                }
              }}
            />
            <input
              type='text'
              value={ rangePicker['endDate'].format('DD/MM/YYYY') }
              onChange={(event) => {
                event.preventDefault;
                if(event.target.value !== undefined){
                  this.setState({rangePicker:{
                    startDate: rangePicker['startDate'],
                    endDate: moment(event.target.value, 'DD/MM/YYYY')
                  }})
                }

              }}
            />
          </div>
          <DateRange
            startDate={rangePicker['startDate']}
            endDate={rangePicker['endDate'] }
            minDate='05/01/2018'
            maxDate='05/10/2019'
            onInit={ this.handleChange.bind(this, 'rangePicker') }
            onChange={ this.handleChange.bind(this, 'rangePicker') }
            linkedCalendars={ this.state.linkedCalendars }
            disableDaysBeforeToday={true}
            firstDayOfWeek={1}
            lang="de"
            rangedCalendars={true}
            calendars={this.state.calendars}
            headerText='Bitte wählen Sie Ihren spätesten Rückflug aus.'
            footerButton={buttonComp}
            theme={this.state.theme}
          />
        </Section>
      </main>
    )
  }
}
