import {Amath} from './Amath';

export class Avector {    
    constructor(ax, ay) {
        this.x = ax || 0;
        this.y = ay || 0;
    }
		

    /**
     * Копирует параметры переданного вектора
     * 
     * @param v - вектор параметры которого будут скопированы
     */
    copy(v) {
        this.x = v.x;
        this.y = v.y;
    }
    
    /**
     * Устанавливает новые значения вектора
     */
    set(ax = 0, ay = 0) {
        this.x = ax;
        this.y = ay;
    }
    
    /**
     * Складывает значения указанного вектора с текущими
     * 
     * @param v - вектор значения которого будут сложены
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }
    
    /**
     * Сравнивает указанный вектор с текущим с определенной погрешностью
     * 
     * @param v - вектор с которым производится сравнение
     * @param diff - допустимая погрешность
     * 
     * @return возвращает true если векторы равны, или false если не равны
     */
    equal(v, diff = 0.00001) {
        return (Amath.equal(this.x, v.x, diff) && Amath.equal(this.y, v.y, diff));
    }
    
    /**
     * Устанавливает значения вектора как векторную скорость
     * 
     * @param speed - скорость
     * @param angle - угол движения в радианах
     */
    asSpeed(speed, angle) {
        this.x = speed * Math.cos(angle);
        this.y = speed * Math.sin(angle);
    }
    
    /**
     * @public
     */
    toString() {
        return "{Avector: " + this.x.toString() + ", " + this.y.toString() + "}";
    }
}