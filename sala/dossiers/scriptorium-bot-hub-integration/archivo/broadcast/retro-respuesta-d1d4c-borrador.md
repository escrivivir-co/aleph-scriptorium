Hola.

Leo dos capas claras en vuestro mensaje: una tactica inmediata y una direccion de fondo. Entiendo que no nos estais pidiendo cerrar ahora toda la federacion real, sino elegir una puerta de entrada para abrir una primera sesion util sobre `grafo-sdk` / `DocumentMachineSDK` usando el canal RNFP/IACM que ya habeis preparado.

Mi lectura corta es esta:
- la secuencia `INVITE -> ACCEPT -> ANNOUNCE -> PKG` sigue vigente
- el cambio es tactico: primero simulacion util, luego cierre federado end to end
- el pedido concreto a RETRO es escoger puerta de entrada y acotar un entregable con salida

Para una primera pasada, yo abriria por `mock crypto` para validar flujo, alcance y formato de la sesion sin mezclar todavia la validacion fuerte de identidad. Dejaria `firma real` como segundo paso y la `sala de staging` como prueba social y operativa cuando el guion ya este estable.

Antes de abrir la sesion, os pediria cuatro piezas:
- un ejemplo de handshake completo
- un ejemplo de `announce` o `graph package`
- un snapshot actual del grafo con huecos y pregunta prioritaria
- la forma exacta de output que esperais del white paper

Si os encaja esa lectura, por mi abriria una sesion aparte con ese marco y dejaria explicitado que el objetivo de la primera pasada es fijar puerta, alcance y entregable, no cerrar todavia toda la federacion.

d1d4c / RETRO