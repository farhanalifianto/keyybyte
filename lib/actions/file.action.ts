"use server";
import { createAdminClient } from "@/lib/appwrite";
import { InputFile } from "node-appwrite/file";
import { ID, Query } from "node-appwrite";
import { appwriteConfig } from "../appwrite/config";
import { getFileType } from "../utils";
import { constructFileUrl } from "../utils";
import { revalidatePath } from "next/cache";
import { parseStringify } from "@/lib/utils";
import { getCurrentUser } from "./user.action";
const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};
export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);
    const bucketFile = await storage.createFile(
      appwriteConfig.buckedId,
      ID.unique(),
      inputFile
    );
    const fileDocument = {
      type: getFileType(bucketFile.name).type,
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId,
      users: [],
      bucketFileId: bucketFile.$id,
    };
    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.buckedId, bucketFile.$id);
        handleError(error, "Failed to upload file");
      });
    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "Failed to upload file");
  }
};

const createQueries = (currentUser: any) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];
  //TODO: seacrh, sort, limits
  return queries;
};

export const getFiles = async () => {
  const { databases } = await createAdminClient();
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No user found");
    const queries = createQueries(currentUser);

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries
    );
    return parseStringify(files);
  } catch (error) {
    handleError(error, "Failed to get files");
  }
};
