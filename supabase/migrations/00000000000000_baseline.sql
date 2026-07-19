--
-- PostgreSQL database dump
--

\restrict 3jRhq8iNjG5rlF9w0SGyRuVwBQmYVwHuOcpwQDxJBeh39H2IWJQjIQdlMgN9Kve

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: rls_auto_enable(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.rls_auto_enable() RETURNS event_trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: admin_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_preferences (
    user_id uuid NOT NULL,
    key text NOT NULL,
    value jsonb DEFAULT '{}'::jsonb NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: card_statements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.card_statements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid DEFAULT auth.uid() NOT NULL,
    card_id uuid NOT NULL,
    period date NOT NULL,
    is_paid boolean DEFAULT false NOT NULL,
    is_estimated boolean DEFAULT false NOT NULL,
    due_date date,
    cycle_start date,
    cycle_end date,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    amounts jsonb DEFAULT '{}'::jsonb NOT NULL
);


--
-- Name: credit_cards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.credit_cards (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid DEFAULT auth.uid() NOT NULL,
    name text NOT NULL,
    color text,
    default_payment_day integer,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    currencies text[] DEFAULT '{PEN}'::text[] NOT NULL,
    default_cycle_start_day smallint,
    default_cycle_end_day smallint,
    CONSTRAINT cycle_end_day_range CHECK (((default_cycle_end_day IS NULL) OR ((default_cycle_end_day >= 1) AND (default_cycle_end_day <= 31)))),
    CONSTRAINT cycle_start_day_range CHECK (((default_cycle_start_day IS NULL) OR ((default_cycle_start_day >= 1) AND (default_cycle_start_day <= 31))))
);


--
-- Name: income_entries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.income_entries (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid DEFAULT auth.uid() NOT NULL,
    job_id uuid NOT NULL,
    income_type text NOT NULL,
    description text,
    amount numeric(12,2) DEFAULT 0 NOT NULL,
    currency text DEFAULT 'USD'::text NOT NULL,
    period date,
    entry_date date,
    expected_date date,
    paid_date date,
    is_paid boolean DEFAULT false NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT income_entries_income_type_check CHECK ((income_type = ANY (ARRAY['recurring'::text, 'one_off'::text]))),
    CONSTRAINT income_entries_type_dates_chk CHECK ((((income_type = 'recurring'::text) AND (period IS NOT NULL)) OR ((income_type = 'one_off'::text) AND (entry_date IS NOT NULL))))
);


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jobs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid DEFAULT auth.uid() NOT NULL,
    name text NOT NULL,
    color text,
    is_active boolean DEFAULT true NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: period_adjustments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.period_adjustments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid DEFAULT auth.uid() NOT NULL,
    period date NOT NULL,
    amount numeric(10,2) NOT NULL,
    note text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tasks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid DEFAULT auth.uid() NOT NULL,
    job_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    status text DEFAULT 'pending'::text NOT NULL,
    priority text DEFAULT 'medium'::text NOT NULL,
    due_date date,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT tasks_priority_check CHECK ((priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text]))),
    CONSTRAINT tasks_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'in_progress'::text, 'done'::text])))
);


--
-- Name: admin_preferences admin_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_preferences
    ADD CONSTRAINT admin_preferences_pkey PRIMARY KEY (user_id, key);


--
-- Name: card_statements card_statements_card_id_period_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.card_statements
    ADD CONSTRAINT card_statements_card_id_period_key UNIQUE (card_id, period);


--
-- Name: card_statements card_statements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.card_statements
    ADD CONSTRAINT card_statements_pkey PRIMARY KEY (id);


--
-- Name: credit_cards credit_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_cards
    ADD CONSTRAINT credit_cards_pkey PRIMARY KEY (id);


--
-- Name: income_entries income_entries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.income_entries
    ADD CONSTRAINT income_entries_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: period_adjustments period_adjustments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.period_adjustments
    ADD CONSTRAINT period_adjustments_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: income_entries_job_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX income_entries_job_id_idx ON public.income_entries USING btree (job_id);


--
-- Name: income_entries_recurring_period_uq; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX income_entries_recurring_period_uq ON public.income_entries USING btree (job_id, period) WHERE (income_type = 'recurring'::text);


--
-- Name: tasks_job_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tasks_job_id_idx ON public.tasks USING btree (job_id);


--
-- Name: admin_preferences admin_preferences_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_preferences
    ADD CONSTRAINT admin_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: card_statements card_statements_card_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.card_statements
    ADD CONSTRAINT card_statements_card_id_fkey FOREIGN KEY (card_id) REFERENCES public.credit_cards(id) ON DELETE CASCADE;


--
-- Name: income_entries income_entries_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.income_entries
    ADD CONSTRAINT income_entries_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- Name: income_entries income_entries_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.income_entries
    ADD CONSTRAINT income_entries_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: tasks tasks_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- Name: card_statements Solo propietario; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo propietario" ON public.card_statements USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: credit_cards Solo propietario; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo propietario" ON public.credit_cards USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: period_adjustments Solo propietario; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Solo propietario" ON public.period_adjustments USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: admin_preferences Users manage own preferences; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users manage own preferences" ON public.admin_preferences USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: admin_preferences; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.admin_preferences ENABLE ROW LEVEL SECURITY;

--
-- Name: card_statements; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.card_statements ENABLE ROW LEVEL SECURITY;

--
-- Name: credit_cards; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.credit_cards ENABLE ROW LEVEL SECURITY;

--
-- Name: income_entries; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.income_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: income_entries income_entries owner access; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "income_entries owner access" ON public.income_entries USING ((user_id = auth.uid())) WITH CHECK ((user_id = auth.uid()));


--
-- Name: jobs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

--
-- Name: jobs jobs_owner_all; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY jobs_owner_all ON public.jobs USING ((user_id = auth.uid())) WITH CHECK ((user_id = auth.uid()));


--
-- Name: period_adjustments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.period_adjustments ENABLE ROW LEVEL SECURITY;

--
-- Name: tasks; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

--
-- Name: tasks tasks_owner_all; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY tasks_owner_all ON public.tasks USING ((user_id = auth.uid())) WITH CHECK ((user_id = auth.uid()));


--
-- PostgreSQL database dump complete
--

\unrestrict 3jRhq8iNjG5rlF9w0SGyRuVwBQmYVwHuOcpwQDxJBeh39H2IWJQjIQdlMgN9Kve

