
export class Amath extends Object {
    static distance(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        
        return Math.sqrt(dx * dx + dy * dy);
    }

    static random(lower, upper) {
        return Math.round(Math.random() * (upper - lower)) + lower;
    }
    
    static equal(a, b, diff = 0.00001) {
        return (Math.abs(a - b) <= diff);
    }
    
    /**
     * Возвращает угол между двумя точками радианах.
     * 
     * @param x1, y1 - координаты первой точки.
     * @param x2, y2 - координаты второй точки.
     * 
     * @return угол между двумя точками в радианах.
     */
    static getAngle(x1, y1, x2, y2, norm = true) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var angle = Math.atan2(dy, dx);
        
        if (norm) {
            if (angle < 0) {
                angle = Math.PI * 2 + angle;
            }
            else if (angle >= Math.PI * 2) {
                angle = angle - Math.PI * 2;
            }
        }
        
        return angle;
    }
    
    /**
     * Возвращает угол между двумя точками в градусах.
     * 
     * @param x1, y1 - координаты первой точки.
     * @param x2, y2 - координаты второй точки.
     * 
     * @return угол между двумя точками в градусах.
     */
    static getAngleDeg(x1, y1, x2, y2, norm = true) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var angle = Math.atan2(dy, dx) / Math.PI * 180;
        
        if (norm) {
            if (angle < 0) {
                angle = 360 + angle;
            }
            else if (angle >= 360) {
                angle = angle - 360;
            }
        }
        
        return angle;
    }
    
    /**
     * Переводит угол из радиан в градусы.
     * 
     * @param radians - угол в радианах.
     * 
     * @return угол в градусах.
     */
    static toDegrees(radians) {
        return radians * 180 / Math.PI;
    }
    
    /**
     * Переводит угол из градусов в радианы.
     * 
     * @param degrees - угол в градусах.
     * 
     * @return угол в радианах.
     */
    static toRadians(degrees) {	
        return degrees * Math.PI / 180;
    }
    
    /**
     * Возвращает процент значения current от общего значения total.
     * 
     * @param current - текущее значение.
     * @param total - общее значение.
     * 
     * @return percent.
     */
    static toPercent(current, total) {
        return (current / total) * 100;
    }
    
    /**
     * Возвращает текущее значене исходя из процентного соотношения к общему числу.
     * 
     * @param percent - текущий процент.
     * @param total - общее значение.
     * 
     * @return возвращает текущее значение.
     */
    static fromPercent(percent, total) {
        return (percent * total) / 100;
    }
}

