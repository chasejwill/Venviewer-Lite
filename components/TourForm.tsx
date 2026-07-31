"use client";

import { useActionState } from "react";
import {
  type ActionState,
  createTourAction,
  updateTourAction,
} from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";

type TourValues = {
  id?: string;
  title: string;
  slug: string;
  kuulaUrl: string;
  published: boolean;
};

function FieldError({ errors }: { errors: string[] | undefined }) {
  return errors?.length ? <span className="error">{errors[0]}</span> : null;
}

export function TourForm({ csrf, tour }: { csrf: string; tour?: TourValues }) {
  const serverAction = tour?.id
    ? updateTourAction.bind(null, tour.id)
    : createTourAction;
  const [state, action] = useActionState<ActionState, FormData>(
    serverAction,
    {},
  );

  return (
    <form action={action} className="card form stack">
      <input type="hidden" name="csrf" value={csrf} />
      <label>
        Title
        <input
          name="title"
          type="text"
          defaultValue={tour?.title}
          maxLength={120}
          required
        />
        <FieldError errors={state.fields?.title} />
      </label>
      <label>
        Slug
        <input
          name="slug"
          type="text"
          defaultValue={tour?.slug}
          minLength={3}
          maxLength={80}
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          required
        />
        <small>Lowercase letters, numbers, and hyphens.</small>
        <FieldError errors={state.fields?.slug} />
      </label>
      <label>
        Kuula URL
        <input
          name="kuulaUrl"
          type="url"
          defaultValue={tour?.kuulaUrl}
          placeholder="https://kuula.co/share/..."
          required
        />
        <FieldError errors={state.fields?.kuulaUrl} />
      </label>
      <label className="checkbox">
        <input
          name="published"
          type="checkbox"
          defaultChecked={tour?.published}
        />
        Published
      </label>
      {state.error ? (
        <p className="error" role="alert">
          {state.error}
        </p>
      ) : null}
      <SubmitButton>{tour ? "Save changes" : "Create tour"}</SubmitButton>
    </form>
  );
}
