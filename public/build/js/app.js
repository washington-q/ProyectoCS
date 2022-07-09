const cita={nombreCliente:"",email:"",fecha:"",hora:"",servicios:[]},$$navegacion=document.querySelectorAll(".tabs button"),$$contenedores=document.querySelectorAll("div .seccion"),tabs=()=>{$$navegacion.forEach(e=>{e.addEventListener("click",cambiarTab)})},cambiarTab=e=>{const t=document.querySelector("button.active"),a=e.target;t.classList.remove("active"),a.classList.add("active"),ocultarBotones(parseInt(a.dataset.paso)),cambiarContenedor(a)},cambiarContenedor=e=>{const t=document.querySelector("#paso-"+e.dataset.paso);$$contenedores.forEach(e=>{e.classList.add("ocultar")}),t.classList.remove("ocultar"),3==e.dataset.paso&&mostrarResumen()},paginacion=()=>{const e=document.querySelector("#anterior");document.querySelector("#siguiente").addEventListener("click",e=>{cambiarPaginaSiguiente(e,1)}),e.addEventListener("click",e=>{cambiarPaginaSiguiente(e,-1)})},ocultarBotones=e=>{const t=document.querySelector("#anterior"),a=document.querySelector("#siguiente");2===e?(t.classList.remove("ocultar"),a.classList.remove("ocultar")):1===e?(t.classList.add("ocultar"),a.classList.remove("ocultar")):3===e&&(t.classList.remove("ocultar"),a.classList.add("ocultar"))},cambiarPaginaSiguiente=(e,t)=>{const a=document.querySelector("button.active"),o=parseInt(a.dataset.paso);ocultarBotones(o+t);const r=document.querySelector(`[data-paso="${o+t}"]`);r.classList.add("active"),a.classList.remove("active"),cambiarContenedor(r)},imprimirServicios=e=>{e.forEach(e=>{const{id:t,nombre:a,precio:o,descripcion:r}=e,c=document.createElement("p");c.classList.add("nombre-servicio"),c.textContent=a;const i=document.createElement("p");i.classList.add("precio-servicio"),i.textContent="$ "+o;const n=document.createElement("p");n.classList.add("descripcion-servicio"),n.textContent=r;const s=document.createElement("div");s.classList.add("servicio"),s.dataset.idServicio=t,s.appendChild(c),s.appendChild(i),document.querySelector("#servicios").appendChild(s)})},seleccionarServicio=()=>{document.querySelectorAll(".servicio").forEach(e=>{e.addEventListener("click",()=>{e.classList.toggle("active");const t=e.dataset.idServicio,a=e.querySelector(".nombre-servicio").textContent,o=e.querySelector(".precio-servicio").textContent,r={id:t,nombre:a,precio:o};cita.servicios.find(e=>e.id===t)||(cita.servicios=[...cita.servicios,r]),e.classList.contains("active")||(cita.servicios=cita.servicios.filter(e=>e.id!==t))})})},consultarServicios=async()=>{try{const e=await fetch("https://taller-autos-proyecto.herokuapp.com/api/servicios"),t=await e.json();imprimirServicios(t),document.querySelectorAll(".servicio").forEach(e=>{e.addEventListener("click",()=>{e.classList.toggle("active");const t=e.dataset.idServicio,a=e.querySelector(".nombre-servicio").textContent,o=e.querySelector(".precio-servicio").textContent,r={id:t,nombre:a,precio:o};cita.servicios.find(e=>e.id===t)||(cita.servicios=[...cita.servicios,r]),e.classList.contains("active")||(cita.servicios=cita.servicios.filter(e=>e.id!==t))})})}catch(e){console.log(e),mostrarAlerta("Error al consultar Servicios","error","#paso-1",!1)}},mostrarAlerta=(e,t,a,o=!0)=>{const r=document.querySelector(".alerta");r&&r.remove();const c=document.createElement("div"),i=document.createElement("p");c.classList.add("alerta"),c.classList.add(t),i.textContent=e,c.appendChild(i);const n=document.querySelector(""+a);"formulario"===a?n.before(c):n.appendChild(c),o&&setTimeout(()=>{c.remove()},3e3)},agregarDatosUsuario=()=>{const e=document.querySelector("#nombre"),t=document.querySelector("#email"),a=document.querySelector("#fecha"),o=document.querySelector("#hora");e.addEventListener("input",()=>{cita.nombreCliente=e.value}),t.addEventListener("input",()=>{cita.email=t.value}),a.addEventListener("input",e=>{6===new Date(a.value).getDay()?(e.target.value="",mostrarAlerta("domingo no es un día laboral","error",".formulario")):cita.fecha=a.value}),o.addEventListener("input",()=>{const e=parseInt(o.value.split(":")[0]);cita.hora=o.value,(e<=7||e>=20)&&(mostrarAlerta("Hora no disponible","error",".formulario"),cita.hora="")})},reservarCita=async()=>{const e=cita.servicios.map(e=>e.id),t=new FormData;t.append("nombre",cita.nombreCliente),t.append("email",cita.email),t.append("fecha",cita.fecha),t.append("hora",cita.hora),t.append("servicios",e);try{const e=await fetch("https://taller-autos-proyecto.herokuapp.com/api/citas",{method:"POST",body:t}),a=await e.json();if(a.error)return void mostrarAlerta(a.error,"error",".contenido-resumen");mostrarAlerta("Cita reservada Correctamente","exito",".contenido-resumen")}catch(e){mostrarAlerta("Error en el Servidor","error",".contenido-resumen"),console.log(e)}},mostrarResumen=()=>{const e=document.querySelector(".contenido-resumen"),t=Object.values(cita);let a=!0;for(t.forEach(e=>{0===e.length&&(a=!1)});e.firstChild;)e.removeChild(e.firstChild);if(!a)return void mostrarAlerta("Por favor completa todos los campos","error",".contenido-resumen",!1);const o=document.createElement("h2");o.textContent="Resumen de la cita",e.appendChild(o);const{nombreCliente:r,email:c,fecha:i,hora:n,servicios:s}=cita,l=document.createElement("p");l.innerHTML="<span>Nombre:</span> "+r,e.appendChild(l);const d=document.createElement("p");d.innerHTML="<span>Email:</span> "+c,e.appendChild(d);const m=document.createElement("p"),u=new Date(i),p=u.getDate()+2,v=u.getMonth(),h=u.getFullYear(),L=new Date(Date.UTC(h,v,p)).toLocaleDateString("es-EC",{weekday:"long",month:"long",year:"numeric",day:"numeric"});m.innerHTML="<span>Fecha:</span> "+L,m.classList.add("fecha-resumen"),e.appendChild(m);const C=document.createElement("p");C.innerHTML="<span>Hora:</span> "+n,e.appendChild(C);const S=document.createElement("p");let b=0;s.forEach(e=>{let{precio:t}=e;t=t.split(" ")[1],b+=parseInt(t)}),S.innerHTML="<span>Precio:</span> $"+b,S.classList.add("precio-resumen"),e.appendChild(S);const E=document.createElement("p");E.classList.add("servicios-resumen"),E.innerHTML="<span>Servicios:</span> "+s.map(e=>e.nombre).join(", "),e.appendChild(E);const y=document.createElement("button");y.classList.add("boton"),y.onclick=reservarCita,y.textContent="Reservar Cita",e.appendChild(y)},iniciarApp=()=>{$$navegacion.forEach(e=>{e.addEventListener("click",cambiarTab)}),paginacion(),consultarServicios(),agregarDatosUsuario()};document.addEventListener("DOMContentLoaded",iniciarApp);