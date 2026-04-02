"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().trim().min(1, "Tiêu đề công việc không được để trống"),
  assignedTo: z.string().trim().min(1, "Tên người thực hiện không được để trống"),
  status: z.enum(["Pending", "Done"]),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Ngày không hợp lệ",
  }),
});


export type TaskFormData = z.infer<typeof taskSchema>;

type Props = {
  defaultValues?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
};

export default function TaskForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      assignedTo: "",
      status: "Pending",
      dueDate: "",
    },
  });


  useEffect(() => {
    reset(
      defaultValues || {
        title: "",
        assignedTo: "",
        status: "Pending",
        dueDate: "",
      }
    );
  }, [defaultValues, reset]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      <div>
        <input
          placeholder="Task Name"
          className="border px-3 py-2 rounded w-full"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <input
          placeholder="Assigned To"
          className="border px-3 py-2 rounded w-full"
          {...register("assignedTo")}
        />
        {errors.assignedTo && (
          <p className="text-red-500 text-sm mt-1">{errors.assignedTo.message}</p>
        )}
      </div>

      <div>
        <select
          className="border px-3 py-2 rounded w-full"
          {...register("status")}
        >
          <option value="Pending">🟡 Pending</option>
          <option value="Done">🟢 Done</option>
        </select>
      </div>

      <div>
        <input
          type="date"
          className="border px-3 py-2 rounded w-full"
          {...register("dueDate")}
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="bg-amber-400 py-2 rounded hover:bg-amber-500 transition disabled:opacity-50"
      >
        Save
      </button>
    </form>
  );
}
