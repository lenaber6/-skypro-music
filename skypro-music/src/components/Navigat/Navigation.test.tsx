import Navigation from "./Navigation";
import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";

describe("Компонент навигации", () => {
    it("Должен отрендерить картинку с логотипом", () => {
        render(<Navigation  />);
        const image = screen.getByAltText("Логотип:Скайпро.Музыка");

        expect(image).toBeInTheDocument();
    });
});