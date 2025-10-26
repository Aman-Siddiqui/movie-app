import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { User } from '../auth/user.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const userRepository = dataSource.getRepository(User);

  const email = 'admin_new@example.com';
  const password = 'SecurePass!2025';

  // Check if user already exists
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    console.log('⚠️ User already exists:', email);
    await app.close();
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save new user
  const user = userRepository.create({
    email,
    password: hashedPassword,
  });

  await userRepository.save(user);
  console.log('✅ Admin user created successfully:', email);

  await app.close();
}

bootstrap();
