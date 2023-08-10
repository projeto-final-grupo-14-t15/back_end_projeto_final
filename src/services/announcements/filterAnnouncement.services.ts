import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities/announcements.entitie";
import { ParsedQs } from "qs";

const filterAnnouncementService = async (
    brand: string | string[] | ParsedQs | ParsedQs[] | undefined,
    model: string | string[] | ParsedQs | ParsedQs[] | undefined,
    color: string | string[] | ParsedQs | ParsedQs[] | undefined,
    year: string | string[] | ParsedQs | ParsedQs[] | undefined,
    fuel: string | string[] | ParsedQs | ParsedQs[] | undefined,
    km: string | string[] | ParsedQs | ParsedQs[] | undefined,
    price: string | string[] | ParsedQs | ParsedQs[] | undefined
): Promise<Announcement[]> => {

    const personRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement)

    let query = personRepository.createQueryBuilder('announcements');

    if (brand) {
        query = query.where('announcements.brand = :brand', { brand });
    }
    if (model) {
        query = query.andWhere('announcements.model = :model', { model });
    }
    if (color) {
        query = query.andWhere('announcements.color = :color', { color });
    }
    if (year) {
        query = query.andWhere('announcements.year = :year', { year });
    }
    if (fuel) {
        query = query.andWhere('announcements.fuel = :fuel', { fuel });
    }
    if (km) {
        query = query.andWhere('announcements.km = :km', { km });
    }
    if (price) {
        query = query.andWhere('announcements.price = :price', {price})
    }

    const dataFiltered = await query.getMany();

    return dataFiltered
};
export { filterAnnouncementService };
