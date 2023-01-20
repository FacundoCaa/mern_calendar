import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = async() => {
 
    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar )
 
    const setActiveEvent = ( calendarEvent ) => {
      dispatch( onSetActiveEvent( calendarEvent ) )
  }

    const startSavingEvent = async( calendarEvent ) => {
      //* TODO: update event
      if ( calendarEvent._id ) {
        // Actualizando
        dispatch( onUpdateEvent({ ...calendarEvent }) )
      } else {
        // Creando

        const { data } = await calendarApi.post('/events', calendarEvent)
        console.log({data})
        dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
      }
    }

    const startDeletingEvent = () => {
      dispatch( onDeleteEvent() )
    }

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
  }
}
