"use client";

import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { ImageUploaderProps } from "./types";

export default function ImageUploader({
  value,
  onChange,
  className = "",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("El archivo es demasiado grande. Máximo 5MB.");
      return;
    }

    setIsUploading(true);

    try {
      // Simular upload - en producción aquí iría la lógica real de upload
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen");
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveImage = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        Imagen del Evento
      </label>

      {value ? (
        <div className="relative">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
            <Image src={value} alt="Preview" fill className="object-cover" />
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={openFileDialog}
            className="absolute bottom-2 right-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            Cambiar
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${
              isDragging
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }
            ${isUploading ? "pointer-events-none opacity-50" : ""}
          `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm text-gray-600">Subiendo imagen...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-3">
                <ImageIcon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex text-sm text-gray-600">
                <p className="font-medium text-blue-600 hover:text-blue-500">
                  Haz clic para subir
                </p>
                <p className="ml-1">o arrastra y suelta</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, WEBP hasta 5MB
              </p>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
