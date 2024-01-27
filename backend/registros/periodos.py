import math

# Calcula el periodo correspondiente a un cohorte tras una cantidad de semestres
# Devuelve un string en formato [0-9]{4}[13]
def calcularPeriodo(cohorte: str, semestres: int):
    if semestres == 1:
        return cohorte
    else:
        anualidad = int(cohorte[:4])
        semestre_inicial = int(cohorte[4:])

        if semestre_inicial == 1:
            ajuste = (semestres/2) - semestre_inicial
            anualidad = anualidad + math.ceil(ajuste)
            semestre = 3 if (ajuste - math.floor(ajuste)) == 0 else 1
        else:
            ajuste = (semestres/2)
            anualidad = anualidad + math.floor(ajuste)
            semestre = 1 if (ajuste - math.floor(ajuste)) == 0 else 3

        periodo = str(anualidad) + str(semestre)
        return periodo

# Calcula todos los periodos de un cohorte
# Devuelve una lista de strings
def calcularPeriodos(cohorte: str, semestres: int):
    periodos = []
    for i in range(semestres):
        periodo = calcularPeriodo(cohorte, i+1)
        periodos.append(periodo)
    return periodos
