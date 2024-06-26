import { formatCurrentTimeDuration } from "./formatCurrentTimeDuration";

describe('Функция форматирования длительности играющего трека', () => {
   
  
    it('Правильно форматирует милисекунды в минуты и секунды', () => {
        const result = formatCurrentTimeDuration(180);
        expect(result).toBe("03:00");
    });
    it('Правильно форматирует 0 в 0 минут и 0 секунд', () => {
        const result = formatCurrentTimeDuration(0);
        expect(result).toBe("00:00");
    });
   
  });