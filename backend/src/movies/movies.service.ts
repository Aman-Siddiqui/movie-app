import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  async findAll(page = 1, limit = 12) {
    const [data, total] = await this.movieRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const movie = await this.movieRepo.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async create(dto: any) {
    const movie = this.movieRepo.create(dto);
    return this.movieRepo.save(movie);
  }

  async update(id: number, dto: any) {
    const movie = await this.findOne(id);
    Object.assign(movie, dto);
    return this.movieRepo.save(movie);
  }

  async remove(id: number) {
    const movie = await this.findOne(id);
    await this.movieRepo.remove(movie);
    return { success: true };
  }
}
