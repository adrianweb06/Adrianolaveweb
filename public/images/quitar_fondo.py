import os
from PIL import Image

# --- CONFIGURACIÓN ---
# Carpeta donde están tus JPGs (puedes usar '.' para la carpeta actual)
carpeta_imagenes = '.' 
# Prefijo para las nuevas imágenes transparentes
prefijo_salida = 'transparente_'

# Umbral de negro: 0 es negro absoluto, sube un poco (ej. 10-20) 
# si el fondo no es negro perfecto.
umbral_negro = 15 

def procesar_imagenes():
    # Listar todos los archivos JPG en la carpeta
    archivos = [f for f in os.listdir(carpeta_imagenes) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    
    if not archivos:
        print("❌ No se encontraron imágenes en esta carpeta.")
        return

    print(f"🚀 Se encontraron {len(archivos)} imágenes para procesar...")

    for archivo in archivos:
        # Evitar procesar lo que ya procesamos
        if archivo.startswith(prefijo_salida):
            continue
            
        ruta_entrada = os.path.join(carpeta_imagenes, archivo)
        nombre_base = os.path.splitext(archivo)[0]
        ruta_salida = os.path.join(carpeta_imagenes, f"{prefijo_salida}{nombre_base}.png")

        try:
            # 1. Abrir la imagen y convertir (RGBA para tener canal alfa)
            img = Image.open(ruta_entrada).convert("RGBA")
            datos = img.getdata()

            # 2. Crear una nueva lista de datos con transparencia
            nuevos_datos = []
            for item in datos:
                # item es una tupla (R, G, B, A)
                # Si R, G y B son menores que el umbral, lo hacemos transparente
                if item[0] < umbral_negro and item[1] < umbral_negro and item[2] < umbral_negro:
                    # R, G, B, Alpha=0 (Totalmente transparente)
                    nuevos_datos.append((0, 0, 0, 0)) 
                else:
                    # Mantener el píxel original
                    nuevos_datos.append(item)

            # 3. Aplicar los nuevos datos a la imagen
            img.putdata(nuevos_datos)

            # 4. Guardar como PNG (obligatorio para transparencia)
            img.save(ruta_salida, "PNG")
            print(f"✅ Procesada: {archivo} -> {f'{prefijo_salida}{nombre_base}.png'}")

        except Exception as e:
            print(f"❌ Error procesando {archivo}: {e}")

    print("\n🏁 ¡Proceso completado!")

if __name__ == "__main__":
    procesar_imagenes()
