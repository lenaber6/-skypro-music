import { formatDuration } from "./formatDuration";

describe('Функция форматирования общей длительности трека', () => {
   
  
    it('Правильно форматирует милисекунды в минуты и секунды', () => {
        const result = formatDuration(6);
        expect(result).toBe("00:06");
    });
    it('Правильно форматирует 0 в 0 минут и 0 секунд', () => {
        const result = formatDuration(0);
        expect(result).toBe("00:00");
    });
   
  });