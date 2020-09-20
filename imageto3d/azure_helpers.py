
import logging
# from azure.storage.blob import BlockBlobService, PublicAccess
from azure.storage.blob import BlobServiceClient, ContainerClient
from azure.core.exceptions import ResourceExistsError
from django.conf import settings


# def upload_file_to_blob(file):
#     """
#     The given method uploads the file to the blob
#     """
#     try:
#         block_blob_service = BlockBlobService(account_name=settings.AZURE_STORAGE_ACCOUNT_NAME,
#                                               account_key=settings.AZURE_STORAGE_ACCOUNT_KEY)

#         block_blob_service.create_container(settings.AZURE_STORAGE_CONTAINER_NAME)

#         block_blob_service.set_container_acl(settings.AZURE_STORAGE_CONTAINER_NAME, public_access=PublicAccess.Container)

#         local_file_name = file.name

#         block_blob_service.create_blob_from_path(settings.AZURE_STORAGE_CONTAINER_NAME, local_file_name, file)

#         generator = block_blob_service.list_blobs(settings.AZURE_STORAGE_CONTAINER_NAME)
#         for blob in generator:
#             print("Blob is: " + blob.name)
#     except Exception as e:
#         logging.exception("Got an exception")
#         pass

def upload_file_to_blob(file, file_name):
    """
    """
    try:
        blob_service_client = BlobServiceClient.from_connection_string(settings.AZURE_STORAGE_CONNECTION_STR)
        try:
            container_client = blob_service_client.create_container(settings.AZURE_STORAGE_CONTAINER_NAME)
            container_client.set_container_access_policy({}, "container")
            print("Container created")
        except ResourceExistsError:
            print("Container already present")
            pass
        # file_name = file.name
        file_name = file_name + ".obj"
        print("Starting the upload")
        blob_client = blob_service_client.get_blob_client(container=settings.AZURE_STORAGE_CONTAINER_NAME, blob=file_name)
        # with open(file.file, "rb") as data:
        #     blob_client.upload_blob(data)
        blob_client.upload_blob(file.file)
        print("Uploaded")
        return settings.AZURE_STORAGE_BLOB_URL_CONSTANT+file_name
    except ResourceExistsError:
        return False
    except:
        logging.exception("Got an exception")
        return False
