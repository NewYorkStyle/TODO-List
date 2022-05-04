import axios from 'axios';
import {REST} from '../../../Core/Consts';
import {IData} from '../Models';

/**
 * Интерфейс сервисов для работы с модулем Main.
 */
export interface IServices {
    /**
     * Получение данных с бэка.
     */
    getData: () => Promise<IData>;
}

/**
 * Сервисы для работы с модулем Main.
 */
export class MainServices implements IServices {
    /**
     * @inheritdoc
     */
    getData = (): Promise<IData> => {
        return axios.get(`${REST}/getData`);
    };
}
