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
   minPrice: string | string[] | ParsedQs | ParsedQs[] | undefined,
   maxPrice: string | string[] | ParsedQs | ParsedQs[] | undefined,
   minKm: string | string[] | ParsedQs | ParsedQs[] | undefined,
   maxKm: string | string[] | ParsedQs | ParsedQs[] | undefined,
): Promise<Announcement[]> => {
   const personRepository: Repository<Announcement> =
      AppDataSource.getRepository(Announcement);

   let query = personRepository.createQueryBuilder("announcements");

   if (brand) {
      query = query.where("announcements.brand ILIKE :brand", { brand });
   }
   if (model) {
      query = query.andWhere("announcements.model ILIKE :model", { model });
   }
   if (color) {
      query = query.andWhere("announcements.color ILIKE :color", { color });
   }
   if (year) {
      query = query.andWhere("announcements.year ILIKE :year", { year });
   }
   if (fuel) {
      query = query.andWhere("announcements.fuel ILIKE :fuel", { fuel });
   }

   if (minPrice) {
      query = query.andWhere("announcements.price >= :minPrice", { minPrice });
   }

   if (maxPrice) {
      query = query.andWhere("announcements.price  <= :maxPrice", { maxPrice });
   }

   if (maxKm) {
      query = query.andWhere("announcements.km  <= :maxKm", { maxKm });
   }

   if (minKm) {
      console.log(minKm)
      query = query.andWhere("announcements.km  >= :minKm", { minKm });
   }

   const dataFiltered = await query.getMany();

   return dataFiltered;
};
export { filterAnnouncementService };
