
# 🤝 Guía para Contribuir al Proyecto

¡Gracias por tu interés en contribuir al proyecto **Gestor de Portafolio de Proyectos Freelance**!  
A continuación se describen las normas básicas para colaborar de forma efectiva y organizada.

---

## 🧭 Estructura General del Proyecto

Antes de contribuir, asegúrate de haber leído el `README.md`, donde se explica la estructura del repositorio, las tecnologías utilizadas y el objetivo del sistema.

---

## 🌱 Cómo contribuir

### 1. **Clona el repositorio**
```bash
git clone https://github.com/Brian-s47/Gestor-de-Portafolio-de-Proyectos-Freelance
cd Gestor-de-Portafolio-de-Proyectos-Freelance
```

### 2. **Crea una nueva rama**
Usa nombres descriptivos para tus ramas.
```bash
git checkout -b dev/dev-"nombre developer"
```

### 3. **Haz tus cambios**
Aplica principios SOLID y los patrones de diseño definidos. Sigue la estructura de carpetas establecida.

### 4. **Haz commits claros y semánticos**
Usamos convención de commits estilo `Conventional Commits`. Ejemplos:
- `feat:` para nuevas funcionalidades
- `fix:` para corrección de errores
- `docs:` para cambios en la documentación
- `refactor:` para refactorizaciones de código
- `test:` para agregar o modificar pruebas

```bash
git commit -m "feat: agregar módulo de registro de clientes"
```

### 5. **Sincroniza tu rama**
Antes de hacer push, asegúrate de que tu rama esté actualizada con `main`.

```bash
git pull origin main --rebase
```

### 6. **Haz push de tu rama**
```bash
git push origin dev/dev-"nombre developer"
```

### 7. **Crea un Pull Request**
Desde GitHub, abre un Pull Request hacia la rama `main` y explica brevemente qué hiciste.

---

## 🔍 Revisión de Pull Requests

- Todo PR debe ser revisado por al menos un miembro del equipo.
- Se debe comprobar que el código respeta la estructura del proyecto y los principios SOLID.
- El código debe estar funcional y libre de errores críticos.

---

## 📂 Estructura esperada del proyecto

```
/models
/services
/commands
/config
/utils
/src
/docs
```

---

## 💡 Consideraciones finales

- Todo cambio debe tener una justificación técnica o funcional.
- Mantén el código limpio, modular y con nombres descriptivos.
- Cualquier duda, consulta con el equipo durante los dailies o por el tablero Scrum.

---

Gracias por contribuir con calidad 💻✨
