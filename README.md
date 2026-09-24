# GW2-Character-Viewer
Herramienta para ver la información de los personajes de una cuenta de Guild Wars 2 y crear un documento HTML exportable con toda la información que quieras añadir.
## Funcionamiento
- Debes usar tu clave de API con permisos de <b>guilds</b>, <b>builds</b>, <b>account</b>, <b>characters</b> y <b>wvw</b>.
- Selecciona un personaje de tu cuenta.
- Elige la plantilla de equipamiento y la plantilla de ajustes
- Recuerda poner la Reliquia
- Modifica o añade información al formulario
- Crea el documento exportable
## A tener en cuenta
- <b>ESTA ES UNA VERSIÓN BETA</b> y todavía tiene que mejorar.
- El documento creado es un HTML que puede abrirse en local por cualquier navegador, pero debes tener en cuenta que debes estar online para ver todas las imágenes del documento ya que son importadas desde la API de GW2.
- Si no quieres depender de estar online siempre puedes imprimir el HTML y crear un PDF
- La API de GW2 tiene un limitador de consultas, por lo que un exceso de estas puede resultar en una denegación de uso.
## Errores detectados
Los cálculos de los atributos están dando fallos, sobre todo en el documento exportado. Se tiene que revisar el código JavaScript.
