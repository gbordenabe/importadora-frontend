import { Calendar } from 'primereact/calendar';

interface Props {
	name?: any;
	placeholder?: any;
  onChange?: any;
  value?: any
}

export default function CalendarInput( { name, onChange, value }:Props ) {

    return (
        <div className="card flex justify-content-center">
            <Calendar
              name={name}
              value={value} 
              onChange={onChange} 
              placeholder={"Selecciona una Fecha"} 
            />
        </div>
    )
}
    