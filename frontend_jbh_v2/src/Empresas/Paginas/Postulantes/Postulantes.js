import React from 'react'

function Postulantes() {
  return (
    <div>
      Postulantes
    </div>
  )
}

export { Postulantes };

/*
DATOS JOBS
curl -X POST http://0.0.0.0:5000/api/v1/jobs -H "Content-Type: application/json" -d '{"partner_id": 1, "id":1, "job_type": "Tiempo Completo", "code": "11", "title": "Full Stack Developer", "pres_or_remote": "Presencial", "experience": "2 años", "salary": "A convenir", "age_min": 18, "age_max": 35, "description": "La consultora pertenece al grupo NTT DATA, la sexta compañía de servicios IT del mundo, con 70.000 profesionales y presencia en Asia-Pacífico, Oriente Medio, Europa, Latinoamérica y Norteamérica. La integración en NTT DATA permite a everis ampliar las soluciones y servicios para sus clientes, aumenta sus capacidades, recursos tecnológicos, geográficos y financieros le ayuda a dar las respuestas más innovadoras a sus clientes.", "city": "Lima", "country": "Perú", "travel_availability": "No"}' -vvv

curl -X POST http://0.0.0.0:5000/api/v1/jobs -H "Content-Type: application/json" -d '{"partner_id": 1, "id":2, "job_type": "Tiempo Completo", "code": "12", "title": "Analista Programador - Full Stack", "pres_or_remote":"Remote", "experience": "2 años", "salary": "S/. 5.500,00 (Mensual)", "age_min": 18, "age_max": 35, "description": "En Valtx, empresa con 20 años de experiencia en el mercado peruano, cuyo objetivo principal es convertirse en un socio estratégico, mediante soluciones tecnológicas en los diversos aspectos de los procesos de negocios; el desarrollo, implementación y mantenimiento de aplicaciones e infraestructura tecnológica para el negocio; y consultoría en diversos procesos de transformación, nos encontramos en la búsqueda de un ANALISTA PROGRAMADOR MOVIL.", "city": "Lima", "country": "Perú", "travel_availability": "No", "contract_type":  "No"}' -vvv"

curl -X POST http://0.0.0.0:5000/api/v1/jobs -H "Content-Type: application/json" -d '{"partner_id": 2, "id":1, "job_type": "Tiempo Parcial", "code": "21", "title": "Programador Web Full Stack Part Time", "pres_or_remote": "Semi-presencial", "experience": "2 años", "salary": "A convenir", "age_min": 18, "age_max": 35, "description": "CSTI Corp es una empresa líder en la industria TI en Perú, especializado en brindar soluciones de negocios en las líneas de outsourcing, soporte y proyectos de innovación e integración utilizando SAP Cloud Platform, SAP Analytics Cloud y SAP Leonardo. Pertenecemos a la red global de SAP Strategic Partner para brindar servicios de consultoría en SAP Leonardo IoT con paquetes aceleradores y productos diseñados para ayudar a nuestros clientes a construir velozmente soluciones IoT específicos a las necesidades de sus negocios y a precios pre-definidos.", "city": "Munich", "country": "Alemania", "travel_availability": "No", "contract_type":  "No"}' -vvv

curl -X POST http://0.0.0.0:5000/api/v1/jobs -H "Content-Type: application/json" -d '{"partner_id": 2, "id":2, "job_type": "Por horas", "code": "22", "title": "Programador Full Stack JAVA - Trabajo remoto", "pres_or_remote":"Remoto", "experience": "5 años", "salary": "A convenir", "age_min": 18, "age_max": 35, "description": "En CSTI Corp somos una empresa líder en la industria TI en Perú, especializados en brindar soluciones de negocios en las líneas de outsourcing, soporte y proyectos de innovación e integración. Somos Gold Partner de SAP y trabajamos con múltiples clientes reconocidos a nivel regional tanto en Peru, Colombia, Ecuador y Costa Rica.", "city": "Lima", "country": "Perú", "travel_availability": "No", "contract_type": "No"}' -vvv

curl -X POST http://0.0.0.0:5000/api/v1/jobs -H "Content-Type: application/json" -d '{"partner_id": 3, "id":1, "job_type": "Tiempo Completo", "code": "31", "title": "Programador Backend", "pres_or_remote":"Semi-presencial", "experience": "2 años", "salary": "S/. 1.798,00 (Mensual)", "age_min": 18, "age_max": 35, "description": "CANVIA es una de las empresas más grandes del sector IT en el Perú y nuestro propósito es hacer más fácil la vida de las personas, innovando e implementando proyectos de transformación digital en múltiples industrias. Nos mueve la reinvención, hacer las cosas diferentes a través de buenas ideas, cuestionar el statu quo.", "city": "Lima", "country": "Perú", "travel_availability": "Si", "contract_type": "No"}' -vvv

*/