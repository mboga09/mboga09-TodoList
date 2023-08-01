import React, {useState, useEffect, useRef} from "react"; //agregue useRef para limpiar input
import "../../styles/index.css";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState([])


	const handleInput = (e) => {
		let texto = e.target.value //este es el texto que se escribe (tarea)
		if(e.keyCode == 13){ //verifica que la tecla presionada sea Enter (tecla 13)
			setTarea(texto)

			//Primera aproximacion para agregar a la lista es usando una variable auxiliar:
			//let arregloTemporal = lista.slice() //copia de arreglo por valor
			//arregloTemporal.push(texto)
			//setLista(arregloTemporal)

			//Segunda aproximacion (la mas usada) es usando el operador spread... (es como sacar lo que hay en un arreglo para ponerlos en otro con el mismo orden)
			setLista([...lista, texto]) //saca del elemento lista y los coloca en ese nuevo arreglo (hay parentesis cuadrados ahi)
			onClear() //Llama funcion que limpia input
		}
	}

	const deleteTask = (index) => {
		let arregloTemporal = lista.slice() //copiar el estado lista
		arregloTemporal = arregloTemporal.filter((item, index2)=>{return index2 != index}) //devuelve todos los elementos con indice diferente al del elemento al que se le dio click
		setLista(arregloTemporal)
	}

	const ref = useRef(null);

	const onClear = () => { //funcion para limpiar input
	  ref.current.value = "";
	};

	return(
		<>
		<body>
			<div className="wrap">
			    <div className="text-center display-2 title py-1">
					TO DO LIST
				</div>
				<div className="paper">
					<div className="ps-5 py-3 border">
						<input style={{border: "none"}} ref={ref} placeholder="What needs to be done?" //Se agrega ref para utilizarla en onClear
						onKeyUp={
							(e)=>{handleInput(e)}
						}/>
					</div>
					{/*<div className="text-center border m-auto">
						Last task you added: {tarea}
					</div>*/}
					<div>
						{/*La lista de tareas es: */}
						<ul className="list-group">
							{lista && lista.length > 0 ? //Para eliminar tareas:
								<>{ //recordar agregar siempre el elemento key para .map
									lista.map((item, index) => {return <li className="list-group-item ps-5 py-3 task" key={index}>{item} <button className="buttonStyle" type="button" onClick={e => {deleteTask(index)}}> 
										x
									</button></li>}) 
								}</> 
								: <p className="ps-5 pt-3 pb-1">Empty list</p>}
						</ul>
					</div>

					<div className="border footer ps-3">
						{lista.length} tasks left
				    </div>

	            </div>

			</div>
			
		</body>
		
		</>
	);
};

export default Home;
