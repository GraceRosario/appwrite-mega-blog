import config from "../config/config";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  tables;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.tables = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  // async createPost({ title, slug, content, featuredImage, status, userId }) {
  //   try {
  //     console.log("Inside createPost:", featuredImage);

  //     return await this.tables.createRow({
  //       databaseId: config.appwriteDatabaseId,
  //       tableId: config.appwriteCollectionId,
  //       rowId: slug,
  //       data: {
  //         title,
  //         slug,
  //         content,
  //         featuredImage,
  //         status,
  //         userId,
  //       },
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    const payload = {
      title,
      slug,
      content,
      featuredImage,
      status,
      userId,
    };

    console.log("Final database payload:", payload);

    return await this.tables.createRow({
      databaseId: config.appwriteDatabaseId,
      tableId: config.appwriteCollectionId,
      rowId: slug,
      data: payload,
    });
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.tables.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: slug,
        data: {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.tables.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.tables.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tables.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        queries,
      });
    } catch (error) {
      throw error;
    }
  }

  // file upload methods

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: config.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId,
      });
    } catch (error) {
      throw error;
    }
  }

  // no async and await as this methos is too fast
  getFileView(fileId) {
    return this.bucket.getFileView({
      bucketId: config.appwriteBucketId,
      fileId,
    });
  }
}

const service = new Service();

export default service;
